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

exports.createCheckin = (req, res, next) => {
    const {errors} = validate(req.body);
    if (errors)
        return res.status(400).send({message: errors.details[0].message})
    else 
        checkinModel.create(req.body)    
        .then(response => {
            if(response) {
                res.status(201).send(response)
                console.log(response);
            } else {
                res.status(409).send("Failed to create checkin");
            }
        })
        .catch(err => {
            res.status(500).send("Internal Server Error: "+err)
        })
        next()
}


exports.createManyCheckins = (req, res, next) => {
    const {errors} = validate(req.body);
    if (errors)
        return res.status(400).send({message: errors.details[0].message})
    else 
        checkinModel.insertMany(req.body)    
        .then(response => {
            if(response) {
                res.status(201).send("Checkins created!")
                console.log(response);
            } else {
                res.status(409).send("Failed to create 3 checkins");
            }
        })
        .catch(err => {
            res.status(500).send("Internal Server Error: "+err)
        })
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

exports.preparingUpdateData = (req, res, next) => {
    if (req.body.submitDate === "")
        req.body.submitDate = new Date().toDateString();
    next();
} 

exports.update = (req, res, next) => {
    const {errors} = validate(req.body);
    if(errors)
        return res.status(400).send({message: errors.details[0].message})
    
    const checkinId = req.query.id;
    checkinModel.findByIdAndUpdate(checkinId, req.body)
    .then(response => {
        if (response){
            next();
            res.status(201).send("Checkin Updated");
        } else {
            res.status(409).send("Failed to update checkin");
        }
    })
    .catch(err => {
        res.status(500).send('Internal Server Error '+err)
    })
}

exports.sendMail = (req, res, next) => {
    const checkinData = req.body;
    mailForCheckins(checkinData);
  }