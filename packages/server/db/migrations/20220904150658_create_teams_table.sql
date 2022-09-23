-- +goose Up
-- +goose StatementBegin
CREATE TABLE teams (
    id uuid NOT NULL PRIMARY KEY,
    name varchar(64) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
    organization_id uuid REFERENCES organizations(id) NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE teams;
-- +goose StatementEnd
