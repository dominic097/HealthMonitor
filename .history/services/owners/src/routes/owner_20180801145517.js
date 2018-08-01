const getOwnersLst = require('./../db/');
const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.send({
    status: 'ok',
    uid: 'owners-service',
  });
});

router.get('/', (req, res) => {
  getOwnersLst()
    .then((jsonContent) => {
      res.wite({
        data: JSON.parse(jsonContent),
        status: 'sucess',
      });
    });
});

module.exports = router;
