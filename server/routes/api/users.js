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
    
    const client = await mongodb.MongoClient.connect('mongodb://kaperont:mnDpwd4KA@peront.ddns.net:27017/?authSource=admin', {
        useNewUrlParser: true
    });

    

    return client.db('home').collection('Users');

}

module.exports = router;
