-- +goose Up
-- +goose StatementBegin
CREATE TYPE role AS ENUM ('ADMIN', 'USER');

CREATE TABLE users (
    id uuid NOT NULL PRIMARY KEY,
    first_name varchar(64) NOT NULL,
    last_name varchar(64) NOT NULL,
    email varchar(254) NOT NULL,
    password char(60),
    created_at timestamp NOT NULL DEFAULT NOW(),
    organization_id uuid REFERENCES organizations(id),
    reports_to uuid REFERENCES users(id),
    role role NOT NULL,
    CONSTRAINT email_unique UNIQUE (email)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE users;
DROP TYPE role;
-- +goose StatementEnd
