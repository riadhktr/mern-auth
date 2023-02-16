const {body, validationResult}  = require('express-validator');

exports.registerValidation = [
    body('email','please enter a valid email').isEmail(),
    body('password','password must contain more than 6 caracters').isLength({min:6})
]


exports.validation=(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next()
}