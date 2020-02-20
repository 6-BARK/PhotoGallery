const faker = require('faker');
const fs = require('fs');

const writeUsers = fs.createWriteStream('./mongohouse2.csv');
writeUsers.write('userid, houseid, sqft, images, bedrooms, bathrooms, price, savedUsers\n', 'utf8');

function writeTenMillionUsers(writer, encoding, callback) {
  let i = 100000;
  let id = 0;

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

  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const userid = id;
      const houseid = Math.floor((Math.random() * 99999999) + 1);
      const sqft = Math.floor((Math.random() * 20000) + 500);
      const images = imageGenerator();
      const bedrooms = Math.floor((Math.random() * 10) + 1);
      const bathrooms = Math.floor((Math.random() * 6) + 1);
      const price = Math.floor((Math.random() * 20000000) + 50000);
      const savedUsers = savedHouseGenerator();
      const data = `${userid}, ${houseid}, ${sqft}, ${images}, ${bedrooms},
      ${bathrooms}, ${price}, ${savedUsers}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
