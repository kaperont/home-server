const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware for dependencies
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

const users = require('./routes/api/users');

app.use('/api/users', users);

const port = 3223;

app.listen(port, () => console.log('Server started on port ' + port));