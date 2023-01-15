package resolver

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/graph/generated"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
)

type questionResolver struct{ *Resolver }

// Question returns generated.QuestionResolver implementation.
func (r *Resolver) Question() generated.QuestionResolver { return &questionResolver{r} }

func (r *questionResolver) Responses(ctx context.Context, question *model.Question) ([]*model.Response, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	responses, err := r.Service.GetQuestionResponses(ctx, question.ID)
	if err != nil {
		return nil, err
	}

	var modelResponses []*model.Response

	for _, response := range responses {
		modelResponses = append(modelResponses, &model.Response{
			ID:       response.ID,
			Position: response.Position,
			Response: response.Response,
		})
	}

	return modelResponses, nil
}
