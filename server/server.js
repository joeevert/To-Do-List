const express = require('express');
const bodyParser = require('body-parser');
const listRouter = require('./routes/list.router.js');

const app = express();

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.use( '/list', listRouter);

app.use( express.static('server/public') );

const port = process.env.port || 5000;
app.listen( port, () => {
  console.log(`up and running on port, ${port}`);
});