-- +goose Up
-- +goose StatementBegin
CREATE TABLE shout_outs (
   id uuid NOT NULL PRIMARY KEY,
   check_in_id uuid references check_ins(id),
   user_id uuid references users(id) NOT NULL,
   organization_id uuid references organizations(id) NOT NULL,
   shout_out text NOT NULL,
   created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE shout_out_receivers (
    shout_out_id uuid references shout_outs(id) NOT NULL,
    receiver_user_id uuid references users(id) NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE shout_out_receivers;
DROP TABLE shout_outs;
-- +goose StatementEnd
