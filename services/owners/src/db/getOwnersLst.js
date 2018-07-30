const dbConstants = require('./constants');
const fs = require('fs');
const path = require('path');

const getOwnersLst = () => {
  return new Promise((resolve) => {
    fs.readFile(path.join(__dirname, dbConstants.dbFileName), (err, data) => {
      if (err) throw err;
      console.log(data);
      resolve(data);
    });
  });
};

module.exports = getOwnersLst;

