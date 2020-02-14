var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/newxillow', {useNewUrlParser: true});
mongoose.connection.dropDatabase();

const House = mongoose.model('House', houseSchema);

const houseSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  address: { type: String, required: true, unique: true},
  images: [{ type: String }],
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
});

//CREATE
const create = (individualHouse) => {
  const newHouse = House({
    id: individualHouse.id,
    address: individualHouse.address,
    images: individualHouse.images,
    bedrooms: individualHouse.bedrooms,
    bathrooms: individualHouse.bathrooms,
    price: individualHouse.price,

  });

  newHouse.save((err, success) => {
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
