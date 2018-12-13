# To Do List

This is a 'To Do List' app that allows the user to create and store tasks inside of a database. Each task has an option to 'Complete' or 'Delete'. When a task is completed, the visual representation of the task updates and gives the user the option to 'Uncheck' the task.

## Built With

* Javascript
* jQuery
* Bootstrap
* CSS

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you get started, make sure you have the following software installed:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)

### Create database

1. Create a new database called `weekend-to-do-app`
2. Then create a table called `list`

```SQL
CREATE TABLE list (
    id SERIAL PRIMARY KEY,
    item VARCHAR (100) NOT NULL,
	status BOOLEAN DEFAULT FALSE
);
```

### Installing

Steps to get the development environment running.

1. Download this project.
2. Run `npm install`
3. Start PostgreSQL if not running already by using `brew services start postgresql`
4. Run `npm start`
5. Navigate to `localhost:5000`

### Completed Features

- [x] Feature `add-task`
- [x] Feature `delete-task`
- [x] Feature `complete-task`
- [x] Feature `uncheck-task`

### Author

Joe Evert

### Acknowledgements

Prime Digital Academy