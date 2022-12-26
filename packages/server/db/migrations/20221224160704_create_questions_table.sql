-- +goose Up
-- +goose StatementBegin
CREATE TYPE response_type AS ENUM ('TASK', 'TEXT', 'SCALE');

CREATE TABLE questions (
    id uuid NOT NULL PRIMARY KEY,
    position smallint NOT NULL,
    check_in_id uuid REFERENCES check_ins(id) NOT NULL,
    question_type varchar(64) NOT NULL,
    text varchar(264),
    response_type response_type NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE questions;
DROP TYPE response_type;
-- +goose StatementEnd
