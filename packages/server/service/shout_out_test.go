package service

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/mikethehud/glancegg/packages/server/test"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestService_CreateShoutOut(t *testing.T) {
	db := test.CreateTestDB(t)
	s := NewService(db, val, log)
	user, err := s.SignUpWithoutOrg(context.TODO(), &model.SignUpWithoutOrgInput{
		OrganizationName: "Test",
		FirstName:        "Hello",
		LastName:         "World",
		Email:            "shoutout@hudson.nz",
		Password:         "howdie ho",
	})
	require.NoError(t, err)
	_, err = s.CreateShoutOut(context.TODO(), user.ID, *user.OrganizationID, nil, "Nice work", []string{user.ID})
	require.NoError(t, err)
}
