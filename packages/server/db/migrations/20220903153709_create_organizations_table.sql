-- +goose Up
-- +goose StatementBegin
CREATE TABLE organizations (
    id uuid NOT NULL PRIMARY KEY,
    name varchar(64) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
    check_in_weekday smallserial NOT NULL,
    timezone text NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE organizations;
-- +goose StatementEnd
