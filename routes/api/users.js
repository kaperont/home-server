const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//GET users
router.get('/', async (req, res) => {
    const users = await loadUsersCollection();
    res.send(await users.find(req.query).toArray());
});


//ADD users
router.post('/', async (req, res) => {
    const users = await loadUsersCollection();
    res.status(201).send();
});


async function loadUsersCollection() {

    const MongoURI = process.env.MONGO_CONNECTION_STRING;
    
    try {

        console.log("Attempting connection to MongoDB at:");
        console.log(MongoURI);

        const client = await mongodb.MongoClient.connect(MongoURI, {
            useNewUrlParser: true
        });

        return client.db('home').collection('Users');
    }
    catch(err) {
        console.log(err);
        console.log("Could not connect to the database.\nMongo Connection String: ", MongoURI);
    }

}

module.exports = router;
