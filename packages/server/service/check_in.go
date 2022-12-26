package service

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/db/queries"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
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

func getDefaultQuestionTemplate() []types.QuestionType {
	return []types.QuestionType{
		types.GQTPulse(),
		types.GQTPriorities(),
		types.GQTChallenges(),
		types.GQTSuccesses(),
	}
}
