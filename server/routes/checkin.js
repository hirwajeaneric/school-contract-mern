var express = require('express');
var router = express.Router();
const { testing, 
    listCheckins, 
    findByRegNumber, 
    findByCheckinId, 
    update, 
    findById, 
    createCheckin, 
    preparingUpdateData,
    createManyCheckins
} = require('../controllers/checkins');

router.get('/', testing);
router.get('/list', listCheckins);
router.post('/new', createCheckin);
router.get('/findByRegNumber', findByRegNumber);
router.get('/findByCheckinId', findByCheckinId)
router.get('/findById', findById)
router.put('/update', preparingUpdateData, update)
router.post('/createthree/', createManyCheckins);

module.exports = router;