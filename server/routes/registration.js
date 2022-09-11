const router = require('express').Router();
const Registration = require('../models/registration');

router.get('/list', (req,res)=>{
    Registration.find((err, response) =>{
        if(err){
            res.status(401).send({message: "No registrations found!"});
        }else{
            res.status(200).setDefaultEncoding({
                numberOfRegistrations: response.length, 
                registrations: response
            })
        }
    })
})

router.get('/searchByRegistrationNumber', (req, res)=>{
    const registrationNumberQuery = req.query.regNumber;
    Registration.find({regNumber: registrationNumberQuery}, (err, response)=> {
        if (err) {
            res.status(401).send({message: err});
        } else {
            res.status(200).send({registration: response})
        }
    })
})

module.exports = router;