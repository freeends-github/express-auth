const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const { registerValidation, loginValidation } = require('../validation/validation');

module.exports = {
    registerUser: async (req,res) => {

        const { error } = registerValidation(req.body);
        if(error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
    
        const emailExist = await User.findOne({ emai: req.body.email });
        if(emailExist) {
            return res.status(400).json({
                message: "Email already exists!"
            });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        try {
            const savedUser = await user.save();
            res.json({
                user: savedUser
            });
        } catch(err) {
            res.status(400).json({
                message: err
            });
        }
    },
    loginUser: async (req,res) => {

        const { error } = loginValidation(req.body);
        if(error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
    
        const user = await User.findOne({ emai: req.body.email });
        if(!user) {
            return res.status(400).json({
                message: "Incorrect email address"
            });
        }
    
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) {
            return res.status(400).json({
                message: 'Invalid password'
            })
        }
    
        // Create token and assign
        const token = jwt.sign( { _id: user._id }, "sekretprejenv" );
        res.header('auth-token', token).json({
            message: "Logged in",
            token: token
        });
    }
}