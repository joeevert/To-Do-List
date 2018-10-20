-- todo database setup

CREATE TABLE list (
    id SERIAL PRIMARY KEY,
	task VARCHAR (100) NOT NULL,
	notes VARCHAR (400) NOT NULL,
	created DATE
    checkbox -- look this up
);

INSERT INTO todo_list (task)