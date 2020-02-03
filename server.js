const express = require('express');
const mongodb = require('mongodb');
const app = express();

const { dbMiddleware } = require('./middlewares');

const SERVICE_PORT = 9001;

const dbConfig = {
    uri: 'mongodb://localhost:27017',
    db: 'test'
}

app.use(express.json()); // untuk mempermudah akses req.body
app.use(express.urlencoded({ extended: true }));

db = dbMiddleware(app, mongodb, dbConfig);
app.use(db);

app.get('/profile/', async (req, res) => {
    const { db } = res.locals;
    const result = await db.collection('user').find({}).toArray();

    //console.log(result);
    return res.status(200).send(result);
})

app.get('/profile/:username', async (req, res) => {
    const { db } = res.locals;
    const result = await db.collection('user').find({ "username": req.params.username }).toArray();

    //console.log(req.params.username);
    return res.status(200).send(result);
})

app.listen(SERVICE_PORT, () => {
    console.log("listening to port ", SERVICE_PORT);
});