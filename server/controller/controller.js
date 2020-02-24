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
  const { userid, houseid } = req.params;
  addSavedHouse(userid, houseid, (err) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).send('saved home');
    }
  });
};

const handlePostImagesToHouseListing = (req, res) => {
  const { userid, houseid } = req.params;
  const { imageurl } = req.body;
  postImagesToHouseListing(userid, houseid, imageurl, (err) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).send('savedImage');
    }
  });
};

const handleUpdateHouseListingImage = (req, res) => {
  const { userid, houseid } = req.params;
  const { imageurl } = req.body;
  updateHouseListingImage(userid, houseid, imageurl, (err) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).send('updated Image');
    }
  });
};

const handleDeleteHouseListingImage = (req, res) => {
  const { userid, houseid } = req.params;
  deleteHouseListingImage(userid, houseid, (err) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(200).send('House Image Deleted');
    }
  });
};

const handleDeleteSavedHouse = (req, res) => {
  const { userid, houseid } = req.params;
  deleteSavedHouse(userid, houseid, (err) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).send('House unsaved');
    }
  });
};

module.exports = {
  handleGetHouseListingsImages,
  handleGetUsersSavedHouses,
  handleAddSavedHouse,
  handlePostImagesToHouseListing,
  handleUpdateHouseListingImage,
  handleDeleteHouseListingImage,
  handleDeleteSavedHouse,
};
