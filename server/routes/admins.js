const router = require('express').Router();
const {Admin, validate} = require('../models/admin');
const bcrypt = require('bcrypt');

router.post('/',async(req,res)=> {
    try {
        //Imported the validate function and passed the request data/
        const { error } = validate(req.body);
        //Checked if there are errors and returned response error message
        if(error)
            return res.status(400).send({message: error.details[0].message})
        
        //Verifying if the new admin already exists in the database or not.
        const admin = await Admin.findOne({email: req.body.email});
        //If the admin already exists we return to them a message
        if(admin)
            return res.status(409).send({message: "User with this email already exists"});
        
        //We first have to hash the password before saving
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //Finally we combine the admin data with the new hashed password and save it.
        await new Admin({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "Admin account created"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});   
    }
})

module.exports = router;