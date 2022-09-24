const Joi = require('joi');

const validate = (data)=>{
    const schema = Joi.object({
        regNumber: Joi.string().required().label('Registration Number'),
        contractId: Joi.date().required().label('Contract Id'),
        checkinNumber: Joi.number().required().label('Checkin'),
        dueAmount: Joi.number().required().label('Due Amount'),
        dueDate: Joi.date().required().label('Due Date'),
        state: Joi.string().required().label('State'),
        status: Joi.string().required().label('Status'),
    })
    return schema.validate(data)
}
module.exports = validate;