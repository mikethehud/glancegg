-- +goose Up
-- +goose StatementBegin
CREATE TABLE responses (
    id uuid NOT NULL PRIMARY KEY,
    question_id uuid NOT NULL references questions(id),
    position smallint NOT NULL,
    response text NOT NULL,
    completed_at timestamp
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE responses;
-- +goose StatementEnd
