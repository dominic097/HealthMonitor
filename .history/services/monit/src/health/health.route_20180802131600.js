const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.send({
    status: 'ok',
    uid: 'pets-service',
  });
});

module.exports = router;
