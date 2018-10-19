const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.use( express.static('server/public') );

const port = process.env.port || 5000;
app.listen( port, () => {
  console.log(`up and running on port, ${port}`);
});