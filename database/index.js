const mysql = require('mysql');
const sql = require('../database/config.js');

const getHouseListingsImages = (houseid, callback) => {
  const query = `SELECT * FROM images WHERE house_id = '${houseid}';`;
  sql.query(query, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

const postImagesToHouseListing = (userid, houseid, imageurl, callback) => {
  const query = 'INSERT INTO images (users_id, house_id, image_url) VALUES (?, ?);';
  sql.query(query, [userid, houseid, imageurl], (err) => {
    if (err) {
      callback(err);
    } else {
      callback('Posted!');
    }
  });
};

const updateHouseListingImage = (userid, houseid, imageurl, callback) => {
  const query = `UPDATE images SET image_url = '${imageurl}' WHERE (house_id = '${houseid}' AND users_id = '${userid}');`;
  sql.query(query, (err) => {
    if (err) {
      callback(err);
    } else {
      callback('Updated!');
    }
  });
};

const deleteHouseListingImage = (userid, houseid, imageurl, callback) => {
  const query = `DELETE FROM images WHERE (users_id = '${userid}' AND house_id = '${houseid}' AND image_url = '${imageurl}');`;
  sql.query(query, (err) => {
    if (err) {
      callback(err);
    } else {
      callback('Images Deleted');
    }
  });
};

module.exports = {
  getHouseListingsImages, postImagesToHouseListing, updateHouseListingImage, deleteHouseListingImage,
};
