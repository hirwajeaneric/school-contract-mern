const router = require('express').Router();
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/',async(req,res)=> {
    try {
        //Imported the validate function and passed the request data/
        const {error} = validate(req.body);
        //Checked if there are errors and returned response error message
        if(error)
            return res.status(400).send({message: error.details[0].message})
        
        //Verifying if the new user already exists in the database or not.
        const user = await User.findOne({regNumber: req.body.regNumber});
        //If the student already exists we return to them a message
        if(user)
            return res.status(409).send({message: "Student with this number already exists"});
        
        //We first have to hash the password before saving
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //Finally we combine the user data with the new hashed password and save it.
        await new User({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "User created successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});   
    }
})

module.exports = router;