const contractSetupModel = require('../models/contractSetup');

exports.testing = (req, res, next) => {
  res.send('Contract Setup Router works very well.');
}

exports.createSetup = (req, res, next) => {
    contractSetupModel.create(req.body)
    .then(response=>{
    if (response) {
        res.status(201).send({message: 'Payment rate saved!', settings: response})
    } else {
        res.status(409).send("Failed to create a setup")
    }
    })
    .catch(err=>{
    res.status(500).send('Internal Server Error: '+err)
    })
}

exports.list = (req, res, next) => {
    contractSetupModel.find()
    .then(response=> {
      if (response) {
        res.status(200).send(response)
      } else {
        res.status(404).send("No contract setups available")
      }
    })
    .catch(err=>{
      res.status(500).send("Server error: "+err)
    })
}

exports.findBySemester = (req, res, next) => {
    contractModel.find({semester: req.query.semester})
    .then(response=> {
      if (response) {
        res.status(200).send(response)
      } else {
        res.status(404).send("No setups!")
      }
    })
    .catch(err=>{
      res.status(500).send("Server error: "+err)
    })
}

exports.findByAcademicYear = (req, res, next) => {
  contractModel.find({ academicYear:req.query.academicYear })
  .then(response=> {
    if (response) {
      res.status(200).send(response)
    } else {
      res.status(404).send("No setup!")
    }
  })
  .catch(err=>{
    res.status(500).send("Server error: "+err)
  })
}

exports.findById = (req, res, next) => {
    contractSetupModel.findById(req.query.id)
    .then(response=> {
      if (response) {
        res.status(200).send(response)
      } else {
        res.status(404).send("No such setup!")
      }
    })
    .catch(err=>{
      res.status(500).send("Server error: "+err)
    })
}

exports.update = (req, res, next) => {
    contractSetupModel.findByIdAndUpdate(req.query.id, req.body)
    .then(response=>{
        if (response) {
          res.status(201).send({message: 'Rate updated!', settings: response});
        } else {
          res.status(409).send("Failed to update setup")
        }
    })
    .catch(err=>{
        res.status(500).send('Internal Server Error'+err)
    })
}