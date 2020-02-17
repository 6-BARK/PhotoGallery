const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/newxillow', { useNewUrlParser: true });
mongoose.connection.dropDatabase();

const houseSchema = mongoose.Schema({
  userid: { type: Number, required: true, unique: true },
  houseid: { type: Number, required: true, unique: true },
  sqft: { type: String, required: true, unique: true },
  images: [{ type: String }],
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  savedHouses: [{ type: Number, required: false }],
});

const House = mongoose.model('House', houseSchema);

// CREATE
const create = (individualHouse) => {
  const newHouse = House({
    houseid: individualHouse.id,
    userid: individualHouse.userid,
    address: individualHouse.address,
    sqft: individualHouse.sqft,
    images: individualHouse.images,
    bedrooms: individualHouse.bedrooms,
    bathrooms: individualHouse.bathrooms,
    price: individualHouse.price,
    savedHouses: individualHouse.savedHouses,

  });

  newHouse.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('House created!');
    }
  });
};

module.exports = {
  create,
};
