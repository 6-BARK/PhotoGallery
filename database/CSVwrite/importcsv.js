const fs = require('fs');
const mysql = require('mysql');
const fastcsv = require('fast-csv');

const stream = fs.createReadStream('users.csv');
const csvData = [];
const csvStream = fastcsv
  .parse()
  .on('data', (data) => {
    csvData.push(data);
  })
  .on('end', () => {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Roswell00",
      database: "houses"
    });

    // open the connection
    connection.connect(error => {
      if (error) {
        console.error(error);
      } else {
        const query = "INSERT INTO users (id) VALUES ?";
        connection.query(query, [csvData], (error, response) => {
          console.log(error || response);
        });
      }
    });
  });

stream.pipe(csvStream);
