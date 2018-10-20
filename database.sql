-- todo database setup

CREATE TABLE list (
    id SERIAL PRIMARY KEY,
    taskName VARCHAR (100) NOT NULL,
);

INSERT INTO todo_list (taskName)
VALUES ('Do your homework');

INSERT INTO todo_list (taskName)
VALUES ('Groceries');

INSERT INTO todo_list (taskName)
VALUES ('Mow the lawn);