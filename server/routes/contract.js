const router = require('express').Router();
const Acontract = require('../models/contractModel');

router.get('/list', (req, res)=>{
    Acontract.find((err, response) => {
        if(err)
            res.status(401).send({message: "You don't have contracts yet. Create one."});
        else    
            res.status(200).send({numberOfContracts: response.length, contracts: response});
    });
});

router.post('/add', async(req, res)=>{
    try {   
        const contract = await Acontract.findOne({regNumber: req.body.regNumber});
        if(contract)
            return res.status(409).send({ message: "Not allowed to create a new contract. You have a pending contract." })
        
        await new Acontract(req.body).save();
        res.status(201).send({message: "Contract created"});

    } catch (error) {
        res.status(500).send({message: "Internal Server Error : "+error});
    }
});

module.exports = router;