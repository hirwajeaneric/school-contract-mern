const router = require('express').Router();
const { Contract, validate } = require('../models/contract');

router.get('/list', (req, res)=>{
    Contract.find((err, response) => {
        if(err)
            res.status(401).send({message: "You don't have contracts yet. Create one."});
        else    
            res.status(200).send({numberOfContracts: response.length, contracts: response});
    });
});

router.post('/add', async(req, res)=>{
    try {
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message})

        const contract = await Contract.findOne({regNumber: req.body.regNumber, status: "Pending"});
        if(contract)
            return res.status(409).send({ message: "Not allowed to create a new contract. You have a pending contract."})
        
        await new Contract().save();
        res.status(201).send({message: "Contract created"});

    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
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

router.get('/searchByRegistrationNumber', (req, res)=>{
    const registrationNumberQuery = req.query.regNumber;
    Contract.find({regNumber: registrationNumberQuery}, (err, response) => {
        if(err)
            res.status(401).send({message: err});
        else    
            res.status(200).send({numberOfContracts: response.length ,contracts: response});
    });
});

module.exports = router;