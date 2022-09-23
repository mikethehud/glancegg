-- +goose Up
-- +goose StatementBegin
CREATE TABLE users_teams (
   id uuid NOT NULL PRIMARY KEY,
   role varchar NOT NULL,
   user_id uuid REFERENCES users(id) NOT NULL,
   team_id uuid REFERENCES teams(id) NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE users_teams;
-- +goose StatementEnd
