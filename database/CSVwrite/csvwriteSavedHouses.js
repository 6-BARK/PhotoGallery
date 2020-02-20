const faker = require('faker');
const fs = require('fs');

const writeUsers = fs.createWriteStream('./savedHouses.csv');
writeUsers.write('id, usersId, houseId\n', 'utf8');

function writeSavedHouses(writer, encoding, callback) {
  let i = 500000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const usersId = Math.floor((Math.random() * 99999) + 1);
      const houseId = Math.floor((Math.random() * 9999999) + 1);
      const data = `${id}, ${usersId}, ${houseId}\n`;
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

writeSavedHouses(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
