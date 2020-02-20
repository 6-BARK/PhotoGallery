const faker = require('faker');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/newxillow', { useNewUrlParser: true });
mongoose.connection.dropDatabase({});


const houseSchema = mongoose.Schema({
  userid: { type: Number, required: true },
  houseid: { type: Number, required: true },
  sqft: { type: String, required: true },
  images: [{ type: String }],
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  savedUsers: [{ type: Number }],
});

const House = mongoose.model('House', houseSchema);

// CREATE
const create = (individualHouse) => {
  const newHouse = House({
    userid: individualHouse.userid,
    houseid: individualHouse.id,
    sqft: individualHouse.sqft,
    images: individualHouse.images,
    bedrooms: individualHouse.bedrooms,
    bathrooms: individualHouse.bathrooms,
    price: individualHouse.price,
    savedUsers: individualHouse.savedHouses,
  });

  newHouse.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('House created!');
    }
  });
};

const imageGenerator = () => {
  const array = [];
  const arraySize = Math.floor((Math.random() * 18) + 5);
  for (let j = 0; j < arraySize; j += 1) {
    array.push(`https://sdchouseimages.s3-us-west-1.amazonaws.com/SDCimages/${Math.floor((Math.random() * 999) + 1)}.jpg`);
  }
  return array;
};

const savedHouseGenerator = () => {
  const array = [];
  const arraySize = Math.floor((Math.random() * 20));
  for (let k = 0; k < arraySize; k += 1) {
    const number = Math.floor((Math.random() * 99999)) + 1;
    array.push(number);
  }
  return array;
};

async function seedDB(outer, inner) {
  let counter = 0;
  for (let i = 0; i < outer; i += 1) {
    let sampleData = [];
    for (let j = 0; j < inner; j += 1) {
      let obj = {
        userid: Math.floor((Math.random() * 99999) + 1),
        houseid: Math.floor((Math.random() * 99999999) + 1),
        sqft: Math.floor((Math.random() * 20000) + 500),
        images: imageGenerator(),
        bedrooms: Math.floor((Math.random() * 10) + 1),
        bathrooms: Math.floor((Math.random() * 6) + 1),
        price: Math.floor((Math.random() * 20000000) + 50000),
        savedUsers: savedHouseGenerator(),
      };
      sampleData.push(obj);
      counter += 1;
    }
    console.log('done');
    await House.insertMany(sampleData);
  }
}
seedDB(1000, 10000);

module.exports = {
  create,
};
