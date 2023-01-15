package service

import (
	"context"
	"github.com/jmoiron/sqlx"
	"github.com/mikethehud/glancegg/packages/server/db/queries"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
)

func (s *Service) CreateCheckIn(ctx context.Context, userID string) (string, error) {
	tx := s.dbx.MustBegin()
	checkInID, err := s.createCheckInAndQuestionsWithTx(ctx, tx, userID)

	if err != nil {
		_ = tx.Rollback()
		return "", err
	}

	tx.Commit()
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

func (s *Service) SubmitCheckInResponses(ctx context.Context, checkInID string, responses []*types.Response) (*types.CheckIn, error) {
	tx := s.dbx.MustBegin()

	for _, response := range responses {
		_, err := queries.CreateResponse(ctx, tx, *response)
		if err != nil {
			tx.Rollback()
			return nil, utils.InternalError(s.Logger, err, "error creating response")
		}
	}

	checkIn, err := queries.SetCheckInCompleted(ctx, tx, checkInID)
	if err != nil {
		tx.Rollback()
		return nil, utils.InternalError(s.Logger, err, "error creating response")
	}

	err = tx.Commit()
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "error committing signup transaction")
	}

	return checkIn, nil
}

func (s *Service) SubmitReview(ctx context.Context, checkInID string, review string) (*types.CheckIn, error) {
	checkIn, err := queries.UpdateCheckInReview(ctx, s.dbx, checkInID, review)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "error updating review on check in")
	}
	return checkIn, nil
}

func (s *Service) GetCheckInsByReviewerID(ctx context.Context, reviewerUserID string) ([]*types.CheckIn, error) {
	checkIns, err := queries.GetCheckInsByReviewerID(ctx, s.dbx, reviewerUserID)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "error receiving check ins for reviewer")
	}
	return checkIns, nil
}

func (s *Service) RefreshCheckIns(ctx context.Context) error {
	tx := s.dbx.MustBegin()
	checkIns, err := queries.SetCheckInsExpired(ctx, tx)
	if err != nil {
		return utils.InternalError(s.Logger, err, "error setting check ins expired")
	}

	// create new check ins for the ones that expired
	for _, checkIn := range checkIns {
		_, err := s.createCheckInAndQuestionsWithTx(ctx, tx, checkIn.UserID)
		if err != nil {
			return utils.InternalError(s.Logger, err, "error creating new check in")
		}
	}

	s.Logger.Infof("refreshed %v check ins", len(checkIns))
	return tx.Commit()
}

// todo: break this up simplify, probably move some business logic into the queries?
func (s *Service) createCheckInAndQuestionsWithTx(ctx context.Context, tx *sqlx.Tx, userID string) (string, error) {
	user, err := queries.GetUserByID(ctx, tx, userID)
	if err != nil {
		return "", errors.Wrap(err, "error getting user")
	}

	org, err := queries.GetOrganizationByUserID(ctx, tx, userID)
	if err != nil {
		return "", errors.Wrap(err, "error getting org")
	}

	expiresAt, err := utils.GetNextExpiration(org.Timezone, org.CheckInWeekday)
	if err != nil {
		return "", utils.InternalError(s.Logger, err, "error retrieving next expiresAt date")
	}

	// create check-in
	checkInID, err := queries.CreateCheckIn(ctx, tx, types.CheckIn{
		UserID:         user.ID,
		OrganizationID: *user.OrganizationID,
		ReviewerUserID: *user.ReportsTo,
		ExpiresAt:      expiresAt,
	})
	if err != nil {
		return "", utils.InternalError(s.Logger, err, "cannot create checkIn")
	}

	// create questions
	questionTypes := getDefaultQuestionTemplate()
	for i, qt := range questionTypes {
		_, err := queries.CreateQuestion(ctx, tx, qt, checkInID, i)
		if err != nil {
			// roll back if any questions fail for some reason
			return "", utils.InternalError(s.Logger, err, "cannot create checkIn")
		}
	}

	return checkInID, nil
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
