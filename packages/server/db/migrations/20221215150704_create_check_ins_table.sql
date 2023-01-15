-- +goose Up
-- +goose StatementBegin
CREATE TABLE check_ins (
    id uuid NOT NULL PRIMARY KEY,
    organization_id uuid REFERENCES organizations(id) NOT NULL,
    user_id uuid REFERENCES users(id) NOT NULL,
    reviewer_user_id uuid REFERENCES users(id),
    review text,
    created_at timestamp NOT NULL DEFAULT NOW(),
    completed_at timestamp,
    reviewed_at timestamp,
    expires_at timestamp NOT NULL,
    expired boolean DEFAULT false
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE check_ins;
-- +goose StatementEnd
