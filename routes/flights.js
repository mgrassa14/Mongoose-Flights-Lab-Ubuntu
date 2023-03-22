var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights')

/* GET users listing. */
// corresponds to the functions within controllers/flights.js 
router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);
router.get('/:id', flightsCtrl.show);
router.post('/', flightsCtrl.create)

// console.log('<<<<<<routes/flights')
module.exports = router;
