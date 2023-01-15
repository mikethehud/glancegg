package resolver

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/graph/generated"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
)

type checkInResolver struct{ *Resolver }

// CheckIn returns generated.CheckInResolver implementation.
func (r *Resolver) CheckIn() generated.CheckInResolver { return &checkInResolver{r} }

func (r *checkInResolver) User(ctx context.Context, checkIn *model.CheckIn) (*model.User, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	user, err := r.Service.GetUserFromCheckIn(ctx, checkIn.ID)
	if err != nil {
		return nil, err
	}

	return user.ToModel(), nil
}

func (r *checkInResolver) Reviewer(ctx context.Context, checkIn *model.CheckIn) (*model.User, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	user, err := r.Service.GetReviewerFromCheckIn(ctx, checkIn.ID)
	if err != nil {
		return nil, err
	}

	return user.ToModel(), nil
}

func (r *checkInResolver) Questions(ctx context.Context, checkIn *model.CheckIn) ([]*model.Question, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	questions, err := r.Service.GetCheckInQuestions(ctx, checkIn.ID)
	if err != nil {
		return nil, err
	}

	var modelQuestions []*model.Question
	for _, question := range questions {
		modelQuestions = append(modelQuestions, question.ToModel())
	}

	return modelQuestions, nil
}

func (r *mutationResolver) CreateCheckIn(ctx context.Context, input model.CreateCheckInInput) (string, error) {
	if !utils.IsAdmin(ctx) {
		return "", errors.New(utils.ErrorNoAccess)
	}

	checkInID, err := r.Service.CreateCheckIn(ctx, input.UserID)
	if err != nil {
		return "", err
	}

	return checkInID, nil
}

func (r *queryResolver) CheckIns(ctx context.Context) ([]*model.CheckIn, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	checkIns, err := r.Service.GetCheckInsByUserID(ctx, utils.ContextUserID(ctx))
	if err != nil {
		return nil, err
	}

	var modelCheckIns []*model.CheckIn
	for _, checkIn := range checkIns {
		modelCheckIns = append(modelCheckIns, checkIn.ToModel())
	}

	return modelCheckIns, nil
}

func (r *queryResolver) CheckInByID(ctx context.Context, checkInID string) (*model.CheckIn, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	checkIn, err := r.Service.GetCheckInByID(ctx, checkInID)
	if err != nil {
		return nil, err
	}

	return checkIn.ToModel(), nil
}

func (r *mutationResolver) SubmitCheckInResponses(ctx context.Context, input model.SubmitCheckInResponsesInput) (*model.CheckIn, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	var responses []*types.Response
	for _, resInput := range input.Responses {
		responses = append(responses, &types.Response{
			QuestionID: resInput.QuestionID,
			Position:   resInput.Position,
			Response:   resInput.Response,
		})
	}

	checkIn, err := r.Service.SubmitCheckInResponses(ctx, input.CheckInID, responses)
	if err != nil {
		return nil, err
	}

	return checkIn.ToModel(), nil
}

func (r *mutationResolver) SubmitCheckInReview(ctx context.Context, input model.SubmitCheckInReviewInput) (*model.CheckIn, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	checkIn, err := r.Service.SubmitReview(ctx, input.CheckInID, input.Review)
	if err != nil {
		return nil, err
	}

	return checkIn.ToModel(), nil
}

func (r *queryResolver) CheckInsByReviewer(ctx context.Context) ([]*model.CheckIn, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	checkIns, err := r.Service.GetCheckInsByReviewerID(ctx, utils.ContextUserID(ctx))
	if err != nil {
		return nil, err
	}

	var modelCheckIns []*model.CheckIn
	for _, checkIn := range checkIns {
		modelCheckIns = append(modelCheckIns, checkIn.ToModel())
	}

	return modelCheckIns, nil
}
