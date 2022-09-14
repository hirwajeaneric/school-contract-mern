const router = require('express').Router();
const { Contract, validate } = require('../models/contract');

router.get('/list', (req, res)=>{
    Contract.find((err, response) => {
        if(err)
            res.status(401).send({message: "You don't have contracts yet. Create one."});
        else    
            // res.status(200).send({numberOfContracts: response.length, contracts: response});
            res.status(200).send(response);
    });
});

router.post('/add', async(req, res)=>{
    try {
        const {errors} = validate(req.body);
        if(errors)
            return res.status(400).send({message: errors.details[0].message})
            // return res.status(400).send({message: "Just Validation Errors"})

        const contract = await Contract.findOne({regNumber: req.body.regNumber, status: "Pending"});
        if(contract)
            return res.status(409).send({ message: "Not allowed to create a new contract. You have a pending contract."})
        
        await new Contract(req.body).save();
        res.status(201).send({message: "Contract created"});

    } catch (error) {
        res.status(500).send({message: "Internal Server Error : "+error});
    }
});

router.put('/update', async(req, res)=>{
    try {
        const idQuery = req.query.id;
        const statusQuerry = req.query.status;
        await Contract.findByIdAndUpdate(idQuery, { status: statusQuerry}, (err, res)=>{
            if (err)
                res.status(401).send(err);
            else 
                res.status(200).send({message: "Contract Updated Successfully", contract: res});
        });
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
});

router.get('/searchById', (req, res)=>{
    const idQuery = req.query.id;
    Contract.findById(idQuery, (err, response) => {
        if(err)
            res.status(401).send({message: err});
        else    
            res.status(200).send({contract: response});
    });
});

router.get('/searchByRegistrationNumber/:regNumber', (req, res)=>{
    const registrationNumberQuery = req.params.regNumber;
    Contract.find({regNumber: registrationNumberQuery}, (err, response) => {
        if(err)
            res.status(401).send({message: err});
        else    
            res.status(200).send(response);
    });
});

module.exports = router;