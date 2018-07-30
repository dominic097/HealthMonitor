const getPetsLst = require('./../db/');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    status: 'ok',
  });
});

router.get('/server/', (req, res) => {
  getPetsLst()
    .then((jsonContent) => {
      res.json({
        data: JSON.parse(jsonContent),
        status: 'sucess',
      });
    });
});

module.exports = router;
