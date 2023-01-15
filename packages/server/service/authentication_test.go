package service

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/mikethehud/glancegg/packages/server/test"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestService_SignUpWithPassword(t *testing.T) {
	t.Run("Signup works with correct values", func(t *testing.T) {
		db := test.CreateTestDB(t)
		s := NewService(db, val, log)
		user, err := s.SignUpWithoutOrg(context.TODO(), &model.SignUpWithoutOrgInput{
			OrganizationName: "Test Org",
			FirstName:        "Mike",
			LastName:         "Hudson",
			Email:            "testing@hudson.nz",
			Password:         "my cool password",
		})
		require.NoError(t, err)
		assert.NotEmpty(t, user.ID)
		assert.NotEmpty(t, user.OrganizationID)
	})
}

func TestService_LogInWithPassword(t *testing.T) {
	t.Run("Login fails if email doesn't exist", func(t *testing.T) {
		db := test.CreateTestDB(t)
		s := NewService(db, val, log)
		_, err := s.LogInWithPassword(context.TODO(), "mike@hudson.nz", "my cool password")
		require.Error(t, err)
	})
	t.Run("Login fails if passwords dont match", func(t *testing.T) {
		db := test.CreateTestDB(t)
		s := NewService(db, val, log)
		// create user first
		_, err := s.SignUpWithoutOrg(context.TODO(), &model.SignUpWithoutOrgInput{
			OrganizationName: "Test Org",
			FirstName:        "Mike",
			LastName:         "Hudson",
			Email:            "testing@hudson.nz",
			Password:         "my cool password",
		})
		_, err = s.LogInWithPassword(context.TODO(), "mike@hudson.nz", "wrong password")
		require.Error(t, err)
	})
	t.Run("Login works with correct values", func(t *testing.T) {

		db := test.CreateTestDB(t)
		s := NewService(db, val, log)
		// create user first
		_, err := s.SignUpWithoutOrg(context.TODO(), &model.SignUpWithoutOrgInput{
			OrganizationName: "Test Org",
			FirstName:        "Mike",
			LastName:         "Hudson",
			Email:            "testing@hudson.nz",
			Password:         "my cool password",
		})
		require.NoError(t, err)
		// login with user creds
		u, err := s.LogInWithPassword(context.TODO(), "mike@hudson.nz", "my cool password")
		require.NoError(t, err)
		assert.Equal(t, "mike@hudson.nz", u.Email)
	})
}
