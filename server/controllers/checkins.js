const checkinModel = require('../models/checkin');
const validate = require('../services/validateCheckins');

exports.testing = (req, res, next) => {
    res.send('Checkin Router works perfectly...');    
}

exports.listCheckins = (req, res, next) => {
    checkinModel.find()
    .then(response=> {
        if (response) {
            res.status(200).send(response);
        } else {
            res.status(404).send("No checkins available")
        }
    })
    .catch(err=> {
        res.status(500).send("Server error: "+err)
    })
}

exports.prepareCheckin = (req, res, next) => {
    var checkinNo = 1;
    
    req.body.checkinNumber = checkinNo;
    req.body.creationDate = new Date().toDateString();
    
    console.log(req.body);
    next();
}

exports.createCheckin = (req, res, next) => {
    const {errors} = validate(req.body);
    if (errors)
        return res.status(400).send({message: errors.details[0].message})
    else 
        checkinModel.create(req.body)    
        .then(response => {
            if(response)
                res.status(201).send(response)
            else
                res.status(409).send("Failed to create checkin")
        })
        .catch(err => {
            res.status(500).send("Internal Server Error: "+err)
        })
        next()
}

exports.findByRegNumber = (req, res, next) => {
    const regNumberOfStudent = req.query.regNumber;
    checkinModel.find({regNumber: regNumberOfStudent})
    .then(response => {
        if(response)
            res.status(200).send(response)
        else
            res.status(404).send("No available checkins")
    })
    .catch(err => {
        res.status(500).send('Server error: '+err);
    })
}

exports.findByCheckinId = (req, res, next) => {
    const IdOfCheckin= req.query.checkinId;
    checkinModel.find({checkinId: IdOfCheckin})
    .then(response => {
        if(response)
            res.status(200).send(response)
        else
            res.status(404).send("No available checkins")
    })
    .catch(err => {
        res.status(500).send('Server error: '+err);
    })
}

exports.findById = (req, res, next) => {
    const checkinId = req.query.id;
    checkinModel.findById(checkinId)
    .then(response=> {
      if (response) {
        res.status(200).send(response)
      } else {
        res.status(404).send("No such checkin!")
      }
    })
    .catch(err=>{
      res.status(500).send("Server error: "+err)
    })
}

exports.update = (req, res, next) => {
    const {errors} = validate(req.body);
    if(errors)
        return res.status(400).send({message: errors.details[0].message})
    
    const checkinId = req.query.id;
    checkinModel.findByIdAndUpdate(checkinId, req.body)
    .then(response => {
        if (response)
            res.status(201).send("Checkin Updated")
        else 
            res.status(409).send("Failed to update checkin");
    })
    .catch(err => {
        res.status(500).send('Internal Server Error '+err)
    })
}