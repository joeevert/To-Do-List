-- todo database setup

-- table setup
CREATE TABLE list (
    id SERIAL PRIMARY KEY,
    item VARCHAR (100) NOT NULL,
	status BOOLEAN DEFAULT FALSE
);

-- test data
INSERT INTO list (item)
VALUES ('Do your homework');

INSERT INTO list (item)
VALUES ('Groceries');

INSERT INTO list (item)
VALUES ('Mow the lawn');

INSERT INTO list (item)
VALUES ('Oil change');

INSERT INTO list (item)
VALUES ('gym');