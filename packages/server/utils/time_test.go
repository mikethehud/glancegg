package utils

import (
	"github.com/stretchr/testify/assert"
	"testing"
	"time"
)

func TestFindNextTargetWeekday(t *testing.T) {
	startDate := time.Date(2023, 1, 1, 23, 59, 0, 0, time.UTC)
	t.Run("sunday", func(t *testing.T) {
		assert.Equal(
			t,
			time.Date(2023, 1, 8, 23, 59, 0, 0, time.UTC),
			FindNextTargetWeekday(startDate, 0), // sunday
		)
	})
	t.Run("monday", func(t *testing.T) {
		assert.Equal(
			t,
			time.Date(2023, 1, 9, 23, 59, 0, 0, time.UTC),
			FindNextTargetWeekday(startDate, 1), // monday
		)
	})
	t.Run("tuesday", func(t *testing.T) {
		assert.Equal(
			t,
			time.Date(2023, 1, 3, 23, 59, 0, 0, time.UTC),
			FindNextTargetWeekday(startDate, 2), // tuesday
		)
	})
	t.Run("wednesday", func(t *testing.T) {
		assert.Equal(
			t,
			time.Date(2023, 1, 4, 23, 59, 0, 0, time.UTC),
			FindNextTargetWeekday(startDate, 3), // wednesday
		)
	})
	t.Run("thursday", func(t *testing.T) {
		assert.Equal(
			t,
			time.Date(2023, 1, 5, 23, 59, 0, 0, time.UTC),
			FindNextTargetWeekday(startDate, 4), // thursday
		)
	})
	t.Run("friday", func(t *testing.T) {
		assert.Equal(
			t,
			time.Date(2023, 1, 6, 23, 59, 0, 0, time.UTC),
			FindNextTargetWeekday(startDate, 5), // friday
		)
	})
	t.Run("saturday", func(t *testing.T) {
		assert.Equal(
			t,
			time.Date(2023, 1, 7, 23, 59, 0, 0, time.UTC),
			FindNextTargetWeekday(startDate, 6), // saturday
		)
	})
}
