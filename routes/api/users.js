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

    const connectionString = process.env.MONGO_CONNECTION_STRING;
    
    try {
        const client = await mongodb.MongoClient.connect(connectionString, {
            useNewUrlParser: true
        });
    }
    catch(err) {
        console.log(err);
        console.log("Could not connect to the database.\nMongo Connection String: ", connectionString);
    }

    

    return client.db('home').collection('Users');

}

module.exports = router;
