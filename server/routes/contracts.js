var express = require('express');
var router = express.Router();
const {testing, gatherAllData, createContract, listContracts, findByRegNumber, findById, update, afterUpdateDecisions} = require('../controllers/contracts'); 

// Testing
router.get('/', testing);

// List contracts
router.get('/list', listContracts);

// Creating a new contract
router.post('/new', gatherAllData ,createContract);

//Find by Reg NUmber 
router.get('/findByRegNumber', findByRegNumber);

// Find by id
router.get('/findById', findById);

//Updating a contract and making other actions
router.put('/update', update, afterUpdateDecisions)

module.exports = router;
