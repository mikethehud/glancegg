package service

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/db/queries"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
)

func (s *Service) CreateCheckIn(ctx context.Context, userID string) (string, error) {
	tx := s.dbx.MustBegin()

	user, err := s.GetUserByID(ctx, userID)
	if err != nil {
		return "", err
	}

	// create check-in
	checkInID, err := queries.CreateCheckIn(ctx, tx, types.CheckIn{
		UserID:         user.ID,
		OrganizationID: *user.OrganizationID,
		ReviewerUserID: user.ReportsTo,
	})
	if err != nil {
		tx.Rollback()
		return "", utils.InternalError(s.Logger, err, "cannot create checkIn")
	}

	// create questions
	questionTypes := getDefaultQuestionTemplate()
	for i, qt := range questionTypes {
		_, err := queries.CreateQuestion(ctx, tx, qt, checkInID, i)
		if err != nil {
			// roll back if any questions fail for some reason
			tx.Rollback()
			return "", utils.InternalError(s.Logger, err, "cannot create checkIn")
		}
	}

	err = tx.Commit()
	if err != nil {
		return "", utils.InternalError(s.Logger, err, "error committing delete user transaction")
	}
	return checkInID, nil
}

func (s *Service) GetCheckInsByUserID(ctx context.Context, userID string) ([]*types.CheckIn, error) {
	c, err := queries.GetCheckInsByUserID(ctx, s.dbx, userID)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "cannot retrieve check ins")
	}
	return c, nil
}

func (s *Service) GetCheckInByID(ctx context.Context, checkInID string) (*types.CheckIn, error) {
	c, err := queries.GetCheckInByID(ctx, s.dbx, checkInID)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "cannot retrieve check in")
	}
	if !canViewCheckIn(ctx, c) {
		return nil, errors.New(utils.ErrorNoAccess)
	}
	return c, nil
}

func (s *Service) GetCheckInQuestions(ctx context.Context, checkInID string) ([]*types.Question, error) {
	q, err := queries.GetCheckInQuestions(ctx, s.dbx, checkInID)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "cannot retrieve check in questions")
	}
	return q, nil
}

func canViewCheckIn(ctx context.Context, checkIn *types.CheckIn) bool {
	return checkIn.CanBeViewedByUser(utils.ContextUserID(ctx)) || !utils.IsAdmin(ctx)
}

func getDefaultQuestionTemplate() []types.QuestionType {
	return []types.QuestionType{
		types.GQTPulse(),
		types.GQTPriorities(),
		types.GQTChallenges(),
		types.GQTSuccesses(),
	}
}
