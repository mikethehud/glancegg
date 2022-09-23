-- +goose Up
-- +goose StatementBegin
CREATE TABLE users (
    id uuid NOT NULL PRIMARY KEY,
    name varchar(64) NOT NULL,
    email varchar(254) NOT NULL,
    password char(60),
    created_at timestamp NOT NULL DEFAULT NOW(),
    organization_id uuid REFERENCES organizations(id) NOT NULL,
    CONSTRAINT email_unique UNIQUE (email)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE users;
-- +goose StatementEnd
