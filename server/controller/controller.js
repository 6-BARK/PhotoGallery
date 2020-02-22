const {
  getHouseListingsImages,
  getUsersSavedHouses,
  addSavedHouse,
  postImagesToHouseListing,
  updateHouseListingImage,
  deleteHouseListingImage,
  deleteSavedHouse,
} = require('../../database/index.js');

const handleGetHouseListingsImages = (req, res) => {
  const houseListingImages = req.params.id;
  getHouseListingsImages(houseListingImages, (err, houseListingImage) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).send(houseListingImage);
    }
  });
};

const handleGetUsersSavedHouses = (req, res) => {
  // req.params.id will take in all the parameters after a : in the url
  console.log(req.params.userid);
  const userSavedHomes = req.params.userid;
  getUsersSavedHouses(userSavedHomes, (err, userSavedHome) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).send(userSavedHome);
    }
  });
};

const handleAddSavedHouse = (req, res) => {
  const usersid = req.params.userid;
  const homeid = req.params.houseid;
  addSavedHouse(usersid, homeid, (err) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).send('saved home');
    }
  });
};

module.exports = { handleGetHouseListingsImages, handleGetUsersSavedHouses, handleAddSavedHouse };
