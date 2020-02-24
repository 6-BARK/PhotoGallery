import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '60s',
};

// export default function () {
//   const id = Math.floor((Math.random() * 9999999) + 1);
//   http.get(`http://localhost:3004/houses/${id}`);
//   sleep(1);
// }

// export default function () {
//   const userid = Math.floor((Math.random() * 999999) + 1);
//   http.get(`http://localhost:3004/user/${userid}/UsersSavedHouses/`);
//   sleep(1);
// }

// export default function () {
//   const userid = Math.floor((Math.random() * 99999) + 1);
//   const houseid = Math.floor((Math.random() * 9999999) + 1);
//   http.post(`http://localhost:3004/user/${userid}/UsersSavedHouses/house/${houseid}`);
//   sleep(1);
// }

export default function () {
  const userid = Math.floor((Math.random() * 99999) + 1);
  const houseid = Math.floor((Math.random() * 9999999) + 1);
  const imgid = Math.floor((Math.random() * 999) + 1);
  http.post(`http://localhost:3004/user/${userid}/houses/${houseid}/images/`, { imageurl: `https://sdchouseimages.s3-us-west-1.amazonaws.com/SDCimages/${imgid}.jpg` });
  sleep(1);
}
