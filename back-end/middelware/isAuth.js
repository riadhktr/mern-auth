const jwt = require('jsonwebtoken');

const userSchema = require('../model/user');



exports.isAuth = async(req,res,next)=>{

    try {
         
        const token = req.header('Authorization')
        console.log('token:',token)


        const decoded = jwt.verify(token,process.env.privatekey);
        console.log('decoded:',decoded);

        if(!decoded)  {
            return res.status(404).json({msg:"not authorized to be here "})
        }
        
        const user = await userSchema.findById(decoded.id);
        console.log(user);

        req.user = user;
        next();




    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"you are not allowed to do this "})
    }
}