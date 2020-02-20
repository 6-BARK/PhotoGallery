const fs = require('fs');

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
    array.push(Math.floor((Math.random) * 99999) + 1);
  }
};

const sampleData = [];

for (let i = 0; i < 10000000; i += 1) {
  sampleData.push({
    userid: Math.floor((Math.random() * 99999) + 1),
    houseid: Math.floor((Math.random() * 99999999) + 1),
    sqft: Math.floor((Math.random() * 20000) + 500),
    images: imageGenerator(),
    bedrooms: Math.floor((Math.random() * 10) + 1),
    bathrooms: Math.floor((Math.random() * 6) + 1),
    price: Math.floor((Math.random() * 20000000) + 50000),
    savedUsers: savedHouseGenerator(),
  });
}

const jsonData = { House: sampleData };

// parse json
const jsonObj = JSON.parse(jsonData);
console.log(jsonObj);

// stringify JSON Object
const jsonContent = JSON.stringify(jsonObj);
console.log(jsonContent);

fs.writeFile('output.json', jsonContent, 'utf8', (err) => {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }

  console.log('JSON file has been saved.');
});
