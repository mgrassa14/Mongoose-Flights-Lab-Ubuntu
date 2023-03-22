const express = require('express');
const router = express.Router();
const destinationCtrl = require('../controllers/destinations');

router.post('/flights/:id/destinations', destinationCtrl.create);
// console.log('<<<<<<routes/destinations')
module.exports = router;