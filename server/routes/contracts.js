var express = require('express');
var router = express.Router();
const {testing, 
    gatherAllData, 
    createContract, 
    listContracts, 
    findByRegNumber, 
    findById, 
    update, 
    checkStatus
} = require('../controllers/contracts'); 

router.get('/', testing);

router.get('/list', listContracts);

router.post('/new', gatherAllData ,createContract);

router.get('/findByRegNumber', findByRegNumber);

router.get('/findById', findById);

router.put('/update', update);

module.exports = router;
