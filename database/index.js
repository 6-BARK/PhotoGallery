const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Roswell00',
  database: 'houses',
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to mysql!');
  }
});

const getHouseListingsImages = (houseid, callback) => {
  const query = 'SELECT * FROM images WHERE house_id = ?';
  connection.query(query, [houseid], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const getUsersSavedHouses = (userid, callback) => {
  const query = 'SELECT * FROM usersavedhomes WHERE users_id = ?';
  connection.query(query, [userid], (err, res) => {
    if (err) {
      console.log('error');
      callback(err);
    } else {
      console.log('success');
      callback(null, res);
    }
  });
};

const postImagesToHouseListing = (userid, houseid, imageurl, callback) => {
  const query = 'INSERT INTO images(users_id, house_id, image_url) VALUES (?, ?, ?);';
  console.log(query);
  connection.query(query, [userid, houseid, imageurl], (err) => {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
};

const addSavedHouse = (userid, houseid, callback) => {
  const query = `INSERT INTO usersavedhomes(users_id, house_id) VALUES (${parseInt(userid, 10)}, ${parseInt(houseid, 10)});`;
  connection.query(query, (err) => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
};

const updateHouseListingImage = (userid, houseid, imageurl, callback) => {
  const query = `UPDATE images SET image_url = ${imageurl} WHERE (house_id = '${houseid}' AND users_id = '${userid}');`;
  connection.query(query, (err) => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
};

const deleteHouseListingImage = (userid, houseid, callback) => {
  const query = `DELETE FROM images WHERE (users_id = '${userid}' AND house_id = '${houseid}');`;
  connection.query(query, (err) => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
};

const deleteSavedHouse = (userid, houseid, callback) => {
  const query = `DELETE FROM usersavedhomes WHERE (users_id = '${userid}' AND house_id = '${houseid}');`;
  connection.query(query, (err) => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
};

module.exports = {
  getHouseListingsImages,
  getUsersSavedHouses,
  addSavedHouse,
  postImagesToHouseListing,
  updateHouseListingImage,
  deleteHouseListingImage,
  deleteSavedHouse,
};
