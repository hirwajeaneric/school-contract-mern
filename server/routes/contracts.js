var express = require('express');
var router = express.Router();
const {testing, 
    gatherAllData, 
    createContract, 
    listContracts, 
    findByRegNumber, 
    findById, 
    update,
    newMiddleWare,
    sendMail
} = require('../controllers/contracts'); 

router.get('/', testing);
router.get('/list', listContracts);
router.post('/new', gatherAllData ,createContract, sendMail);
router.get('/findByRegNumber', findByRegNumber);
router.get('/findById', findById);
router.put('/update', update, newMiddleWare, sendMail);

module.exports = router;
