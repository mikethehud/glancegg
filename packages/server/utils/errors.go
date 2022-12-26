package utils

import (
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

const (
	ErrorInternal     = "INTERNAL"
	ErrorInvalidInput = "INVALID_INPUT"
	ErrorNoAccess     = "NO_ACCESS"

	ErrorAuthUserNotUnique = "USER_NOT_UNIQUE"
	ErrorAuthNoUser        = "USER_DOESNT_EXIST"
	ErrorAuthWrongPassword = "WRONG_PASSWORD"

	ErrorOrgLastAdmin = "LAST_ADMIN"
)

// InternalError logs the error and message, then returns a generic ErrorInternal
func InternalError(log *logrus.Logger, err error, msg string) error {
	if err != nil {
		log.Error(errors.Wrap(err, msg))
		return errors.New(ErrorInternal)
	}
	return nil
}
