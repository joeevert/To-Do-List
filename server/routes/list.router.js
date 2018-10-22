const express = require('express');

const listRouter = express.Router();

const pg = require('pg');

const config = {
    database: 'weekend-to-do-app',
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
    let sqlText = `SELECT * FROM list ORDER BY item DESC;`;

    pool.query(sqlText)
        .then((result) => {
        res.send(result.rows);
        console.log(result.rows);
    })
    .catch( (error) => {
        console.log(`error make db query:`, sqlText, error); // have question
        res.sendStatus(500);
    })
}); // end GET

// POST
listRouter.post('/', (req, res) => {
    const newTask = req.body;
    console.log(newTask);
    const sqlText = `INSERT INTO list (item) VALUES ($1);`;

    pool.query(sqlText, [newTask.item])
    .then((result) => {
        console.log(result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('error sending to db', error);
        res.sendStatus(500);
    })
}); // end POST

// PUT
listRouter.put('/status/:id', (req, res) => {
    let taskId = req.params.id;
    let sqlText = '';
    sqlText = `UPDATE list SET status = true WHERE id=$1;`;

    pool.query(sqlText, [taskId])
    .then((result) => {
        console.log(result);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`error making db query`, sqlText, error);
        res.sendStatus(500);
    })
}); // end PUT

// DELETE
listRouter.delete('/:id', (req, res) => {
    let taskId = req.params.id;
    console.log(reqId);
    let sqlText = `DELETE FROM list WHERE id=$1;`;

    pool.query(sqlText, [taskId])
    .then((result) => {
        console.log(result);
        console.log('task deleted');
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`error making db query`, sqlText, error);
        res.sendStatus(500);
    })
 });

module.exports = listRouter;