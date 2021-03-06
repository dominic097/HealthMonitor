const getOwnersLst = require('./../db/');
const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uid: 'owners-service',
  });
});

router.get('/', (req, res) => {
  getOwnersLst()
    .then((jsonContent) => {
      res.json({
        data: JSON.parse(jsonContent),
        status: 'sucess',
      });
    });
});

module.exports = router;
