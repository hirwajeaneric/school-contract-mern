const router = require('express').Router();
const Registration = require('../models/registration');

router.get('/', function(req, res, next) {
  res.send('Registration Router works very well.');
});

router.get('/list', (req,res,next)=>{
    Registration.find()
    .then(response=> {
        if (response) {
          res.status(200).send(response)
        } else {
          res.status(404).send("No Registractions available")
        }
      })
      .catch(err=>{
        res.status(500).send("Server error: "+err)
      })
})

router.get('/searchByRegistrationNumber', (req, res, next)=>{
    const registrationNumberQuery = req.query.regNumber;
    Registration.findOne({regNumber: registrationNumberQuery})
    .then(response=> {
        if (response) {
          res.status(200).send(response)
        } else {
          res.status(404).send("You have not registered for any course yet!")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
})

router.post('/new', (req, res, next) => {
    Registration.create(req.body)
    .then(response=>{
    if (response) {
      res.status(201).send(response)
    } else {
      res.status(409).send("Failed to register courses")
    }
  })
  .catch(err=>{
    res.status(500).send('Internal Server Error'+err)
  })
})

module.exports = router;