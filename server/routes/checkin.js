var express = require('express');
var router = express.Router();
const { testing, listCheckins, prepareCheckin, findByRegNumber, findByCheckinId, update, findById, createCheckin } = require('../controllers/checkins');

router.get('/', testing);

router.get('/list', listCheckins);

router.post('/new', prepareCheckin, createCheckin);

router.get('/findByRegNumber', findByRegNumber);

router.get('/findByCheckinId', findByCheckinId)

router.get('/findById', findById)

router.put('/update', update)

module.exports = router;