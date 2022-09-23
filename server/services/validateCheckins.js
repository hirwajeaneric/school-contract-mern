const Joi = require('joi');

const validate = (data)=>{
    const schema = Joi.object({
        regNumber: Joi.string().required().label('Registration Number'),
        contractId: Joi.date().required().label('Contract Id'),
        checkinNumber: Joi.number().required().label('Checkin'),
        urubutoPayCode: Joi.string().required().label('Urubuto Payment Code'),
        dueAmount: Joi.number().required().label('Due Amount'),
        paidAmount: Joi.number().required().label('Paid Amount'),
        dueDate: Joi.date().required().label('Due Date'),
        submitDate: Joi.date().required().label('Submit Date'),
        state: Joi.string().required().label('State'),
        status: Joi.string().required().label('Status'),
        comment: Joi.string().required().label('Comment')
    })
    return schema.validate(data)
}
module.exports = validate;