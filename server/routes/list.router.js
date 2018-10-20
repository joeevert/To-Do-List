const express = require('express');

const listRouter = express.Router();

const pg = require('pg');

const config = {
    database: 'todoList',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log(`connected to db`);
});

pool.on('error', (error) => {
    console.log(`error with db pool`, error);
});

// GET
listRouter.get('/', (req,res) => {
    let sqlText = `SELECT * FROM list ORDER BY item ASC;`;
    pool.query(sqlText)
        .then((result) => {
        res.send(result.rows);
        console.log(result.rows);
    })
        .catch( (error) => {
    console.log(`error make db query:`, sqlText, error); // have question
    res.sendStatus(500);
    })
});

// POST

// PUT

// DELETE

module.exports = listRouter;