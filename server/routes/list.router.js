const express = require('express');
const router = express.Router();
const pg = require('pg'); // module for connecting to db

const Pool = pg.Pool;

const pool = new Pool({
    database: 'todo_list',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log(`connected to db`);
});

pool.on('error', (error) => {
    console.log(`error with db pool ${error}`);
});

// get route for list database
router.get('/', (req,res) => {
    const sqlText = `SELECT * FROM list ORDER BY created DESC;`;
    pool.query(sqlText)
        .then((result) => {
            console.log(`got list back from db, ${result}`);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`error make db query: ${sqlText} ${error}`);
            res.sendStatus(500);
        })
});


















module.exports = router;