const contractModel = require('../models/contract');
const validate = require('../services/validateContracts');
const newCheckin = require('../routes/newCheckin');
const { createCheckins } = require('../services/createCheckins');
const { mailForContracts } = require('../services/mailForContracts');
const { scheduler } = require('../services/scheduler');

exports.testing = (req, res, next) => {
  res.send('Contract Router works very well.');
}

exports.gatherAllData = (req, res, next) => {
    const installment = (parseFloat(req.body.dueAmount) - parseFloat(req.body.paidAmount))/3;
    console.log(installment);
    req.body.amountPerInstallment = Math.round((installment*10)/10).toString();
    req.body.creationDate = new Date().toDateString();
    console.log(req.body);
    next()
}

exports.createContract = (req, res, next) => {
    const {errors} = validate(req.body);
    if(errors)
      return res.status(400).send({message: errors.details[0].message})
    else
      contractModel.create(req.body)
      .then(response=>{
        if (response) {
          next();
          res.status(201).send(response)
        } else {
          res.status(409).send("Failed to create a contract")
        }
      })
      .catch(err=>{
        res.status(500).send('Internal Server Error: '+err)
      })
}

exports.listContracts = (req, res, next) => {
    contractModel.find()
    .then(response=> {
      if (response) {
        res.status(200).send(response)
      } else {
        res.status(404).send("No contracts available")
      }
    })
    .catch(err=>{
      res.status(500).send("Server error: "+err)
    })
}

exports.findByRegNumber = (req, res, next) => {
    const regNumberOfStudent= req.query.regNumber;
    contractModel.find({regNumber:regNumberOfStudent})
    .then(response=> {
      if (response) {
        res.status(200).send(response)
      } else {
        res.status(404).send("You don't have any contract yet!")
      }
    })
    .catch(err=>{
      res.status(500).send("Server error: "+err)
    })
}

exports.findByStatus = (req, res, next) => {
  const regNumberOfStudent= req.query.regNumber;
  const statusOfContract= req.query.status;
  contractModel.find({regNumber:regNumberOfStudent, status: statusOfContract})
  .then(response=> {
    if (response) {
      res.status(200).send(response)
    } else {
      res.status(404).send("You don't have any contract yet!")
    }
  })
  .catch(err=>{
    res.status(500).send("Server error: "+err)
  })
}

exports.findAllByStatus = (req, res, next) => {
  const statusOfContract= req.query.status;
  contractModel.find({status: statusOfContract})
  .then(response=> {
    if (response) {
      res.status(200).send(response)
    } else {
      res.status(404).send("You don't have any contract yet!")
    }
  })
  .catch(err=>{
    res.status(500).send("Server error: "+err)
  })
}

exports.findById = (req, res, next) => {
    const contractId = req.query.id;
    contractModel.findById(contractId)
    .then(response=> {
      if (response) {
        res.status(200).send(response)
      } else {
        res.status(404).send("No such contract!")
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
        
    const contractId = req.query.id;
    contractModel.findByIdAndUpdate(contractId, req.body)
    .then(response=>{
        if (response) {
          next();
          res.status(201).send(response);
        } else {
          res.status(409).send("Failed to update contract")
        }
    })
    .catch(err=>{
        res.status(500).send('Internal Server Error'+err)
    })
}


exports.newMiddleWare = (req, res, next) => {
  if(req.body.status ==="Approved"){
    const contractData = req.body;
    createCheckins(contractData);
    scheduler();
  }else {
    scheduler();
  }
  next();
}

exports.sendMail = (req, res, next) => {
  const contractData = req.body;
  mailForContracts(contractData);
}