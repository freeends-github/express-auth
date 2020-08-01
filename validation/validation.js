const Joi = require('@hapi/joi');

// Register validation
const registerValidation = (data) => {
    const schema = Joi.Object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(5).required()
    })
    return schema.validate(data, schema);
}

// Login validation
const loginValidation = (data) => {
    const schema = Joi.Object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(5).required()
    })
    return schema.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;


