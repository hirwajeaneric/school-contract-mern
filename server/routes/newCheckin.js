var express = require('express');
var router = express.Router();
const checkinModel = require('../models/checkin');
const validate = require('../controllers/validateCheckins');

exports.newCheck = router.post('/new', (req, res, next) => {
    // var checkinNo = 1;
    
    // req.body.checkinNumber = checkinNo;
    // req.body.creationDate = new Date().toDateString();
    
    console.log(req.body);
    // next();
}
// ,(req, res, next) => {
//     const {errors} = validate(req.body);
//     if (errors)
//         return res.status(400).send({message: errors.details[0].message})
//     else 
//         checkinModel.create(req.body)    
//         .then(response => {
//             if(response)
//                 res.status(201).send(response)
//             else
//                 res.status(409).send("Failed to create checkin")
//         })
//         .catch(err => {
//             res.status(500).send("Internal Server Error: "+err)
//         })
//         next()
// },(req, res, next) => {
//     const {errors} = validate(req.body);
//     if (errors)
//         return res.status(400).send({message: errors.details[0].message})
//     else 
//         checkinModel.create(req.body)    
//         .then(response => {
//             if(response)
//                 res.status(201).send(response)
//             else
//                 res.status(409).send("Failed to create checkin")
//         })
//         .catch(err => {
//             res.status(500).send("Internal Server Error: "+err)
//         })
//         next()
// }
// ,(req, res, next) => {
//     const {errors} = validate(req.body);
//     if (errors)
//         return res.status(400).send({message: errors.details[0].message})
//     else 
//         checkinModel.create(req.body)    
//         .then(response => {
//             if(response)
//                 res.status(201).send(response)
//             else
//                 res.status(409).send("Failed to create checkin")
//         })
//         .catch(err => {
//             res.status(500).send("Internal Server Error: "+err)
//         })
// }
)
