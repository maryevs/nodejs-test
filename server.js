const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const routes         = require('./app/routes');
const app            = express();
const port = 3002;

//Parse BSON into JSON
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


MongoClient.connect(db.url, {useNewUrlParser: true}, (err, client) => {
//connection to database 'mydb' collection 'todos'
    const database = client.db('mydb').collection('todos');
    if (err) return console.log(err);
    const route = routes(app, database);

    app.listen(port, () => {
        console.log('server is listening on ' + port);
    });


});