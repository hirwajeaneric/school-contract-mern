const router = require('express').Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/', async(req, res)=> {
    try {
        //We also first validate user imputs and return messages accordingly
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message})

        //Here we are going to fetch a user with the regNumber entered.    
        const user = await User.findOne({regNumber: req.body.regNumber});
        //If we do not find the entered user, we give an error message.
        if(!user)
            return res.status(401).send({message: "Invalid Email or Password"})

        //Let's now check if the entered password is correct. By decrypting it first.    
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );    
        //If the password is wrong, we return an error message
        if(!validPassword)
            return res.status(401).send({message: "Invalid Email or Password"});
        
        //When the user is right, we send a token    
        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "Logged in Successfully"})    
        
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

//This method uses JOI to make validations
const validate = (data) => {
    const schema = Joi.object({
        regNumber: Joi.string().required().label('Registration Number'),
        password: Joi.string().required().label('Password')
    })
    return schema.validate(data)
}

module.exports = router;