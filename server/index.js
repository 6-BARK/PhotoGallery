const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const PORT = 3004;
const bodyParser = require('body-parser');
// const schema = require('../database/schema.js');
const Controller = require('./controller/controller.js');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/houses', retrieve);
app.get('/houses/:id', Controller.handleGetHouseListingsImages);
app.get('/user/:userid/UsersSavedHouses/', Controller.handleGetUsersSavedHouses);
app.post('/user/:userid/UsersSavedHouses/house/:houseid', Controller.handleAddSavedHouse);

app.listen(PORT, () => console.log('Listening on port: ' + PORT));