const router = require('express').Router();
const { Admin } = require('../models/admin');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/', async(req, res)=> {
    try {
        //We also first validate admin imputs and return messages accordingly
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message})

        //Here we are going to fetch a admin with the regNumber entered.    
        const admin = await Admin.findOne({email: req.body.email});
        //If we do not find the entered admin, we give an error message.
        if(!admin)
            return res.status(401).send({message: "Invalid Email or Password"})

        //Let's now check if the entered password is correct. By decrypting it first.    
        const validPassword = await bcrypt.compare(
            req.body.password, admin.password
        );    
        //If the password is wrong, we return an error message
        if(!validPassword)
            return res.status(401).send({message: "Invalid Email or Password"});
        
        //When the admin is right, we send a token    
        const token = admin.generateAuthToken();
        res.status(200).send({data: token, message: "Logged in Successfully"})    
        
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

//This method uses JOI to make validations
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    })
    return schema.validate(data)
}

module.exports = router;