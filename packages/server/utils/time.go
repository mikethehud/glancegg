package utils

import (
	"time"
)

func GetNextExpiration(timeZone string, checkInWeekday int) (time.Time, error) {
	loc, err := time.LoadLocation(timeZone)
	if err != nil {
		return time.Time{}, err
	}
	// convert to local, then find next friday and revert it back to UTC
	return FindNextTargetWeekday(time.Now().In(loc), checkInWeekday).In(time.UTC), nil
}

func FindNextTargetWeekday(t time.Time, targetDay int) time.Time {
	eod := time.Date(t.Year(), t.Month(), t.Day(), 23, 59, 0, 0, t.Location())
	weekDay := int(t.Weekday())
	daysToAdd := targetDay - weekDay

	// < 0 would be technically correct, but we allow for a grace period of 2 days
	// e.g. if the due date is friday but today is thursday, we want to get the friday
	// of the week after that (9 days in total).
	// this is to avoid expiring a check-in after just a short amount of time
	if daysToAdd < 2 {
		daysToAdd += 7
	}

	return eod.AddDate(0, 0, daysToAdd)
}
