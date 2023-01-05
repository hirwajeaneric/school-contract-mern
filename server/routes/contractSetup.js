var express = require('express');
const { testing, list, createSetup, findBySemester, update, findById, findByAcademicYear } = require('../controllers/contractSetup');
var router = express.Router();

router.get('/', testing);
router.get('/list', list);
router.post('/new', createSetup);
router.get('/findBySemester', findBySemester);
router.get('/findById', findById);
router.get('/findByAcademicYear', findByAcademicYear);
router.put('/update', update);

module.exports = router;
