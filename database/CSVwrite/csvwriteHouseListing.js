const faker = require('faker');
const fs = require('fs');

const writeUsers = fs.createWriteStream('./houselisting.csv');
writeUsers.write('id, usersId, sqft, bedroom, bathroom, price\n', 'utf8');

function writeTenMillionHouseListings(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const usersId = Math.floor((Math.random() * 99999) + 1);
      const sqft = Math.floor((Math.random() * 20000) + 500);
      const bedroom = Math.floor((Math.random() * 10) + 1);
      const bathroom = Math.floor((Math.random() * 6) + 1);
      const price = Math.floor((Math.random() * 20000000) + 50000);
      const data = `${id},${usersId},${sqft}, ${bedroom}, ${bathroom},${price}\n`;
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

writeTenMillionHouseListings(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
