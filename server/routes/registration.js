const router = require('express').Router();
const Registration = require('../models/registration');
const { testing, listRegistration, searchByRegistrationNumber, createNewRegistration, searchByIdSemesterAcademicYear } = require('../controllers/registration');

router.get('/', testing);

router.get('/list', listRegistration);

router.get('/searchByRegistrationNumber', searchByRegistrationNumber);

router.get('/findByIdSemAcYear', searchByIdSemesterAcademicYear);

router.post('/new', createNewRegistration);

module.exports = router;