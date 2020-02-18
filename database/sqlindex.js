const faker = require('faker');
const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const createUsers = () => {
  for (let i = 0; i < 100000; i += 1) {
    connection.query('INSERT INTO users (id) VALUES (?)', [null], (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('success');
      }
    });
  }
};

const createHouseListing = () => {
  for (let i = 0; i < 10000000; i += 1) {
    connection.query('INSERT INTO houselisting (id, users_id, sqft, bedroom, bathroom, price) VALUES (?, ?, ?, ?, ?, ?)',
      [null, Math.floor((Math.random() * 99999) + 1), Math.floor((Math.random() * 20000) + 500),
        Math.floor((Math.random() * 10) + 1), Math.floor((Math.random() * 6) + 1),
        Math.random((Math.floor() * 20000000) + 50000)], (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('success');
        }
      });
  }
};

const createImages = () => {
  for (let i = 0; i < 10000000; i += 1) {
    connection.query('INSERT INTO images (id, users_id, house_id, image_url) VALUES (?, ?, ?, ?)',
      [null, Math.floor((Math.random() * 99999) + 1), Math.floor((Math.random() * 9999999) + 1),
        `https://sdchouseimages.s3-us-west-1.amazonaws.com/SDCimages/${Math.floor((Math.random() * 999) + 1)}.jpg`],
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('success');
        }
      });
  }
};

const createSavedHouses = () => {
  for (let i = 0; i < 100000; i += 1) {
    connection.query('INSERT INTO usersavedhomes (id, users_id, house_id) VALUES (?, ?, ?)',
      [null, Math.floor((Math.random() * 99999) + 1), Math.floor((Math.random() * 9999999) + 1)],
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('success');
        }
      });
  }
};

createUsers();
createHouseListing();
createImages();
createSavedHouses();
