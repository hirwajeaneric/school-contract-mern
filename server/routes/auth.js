const router = require('express').Router();
const { Student } = require('../models/student');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/', async(req, res)=> {
    try {
        //We also first validate student imputs and return messages accordingly
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message})

        //Here we are going to fetch a student with the regNumber entered.    
        const student = await Student.findOne({regNumber: req.body.regNumber});
        //If we do not find the entered student, we give an error message.
        if(!student)
            return res.status(401).send({message: "Invalid Registration number or Password"})

        //Let's now check if the entered password is correct. By decrypting it first.    
        const validPassword = await bcrypt.compare(
            req.body.password, student.password
        );    
        //If the password is wrong, we return an error message
        if(!validPassword)
            return res.status(401).send({message: "Invalid Registration number or Password"});
        
        //When the student is right, we send a token    
        const token = student.generateAuthToken();
        res.status(200).send({
            data: token, 
            regNumber: student.regNumber, 
            name: student.name
        })

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
