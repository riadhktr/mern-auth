const userSchema = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async(req,res)=>{
    // cryptage lel password 
    // test l'existance mte3 l'email
    try {
        const {name,email,password} = req.body;
        const found = await userSchema.findOne({email}) // email est ce que mawjoud ou nn 
        if(found){
           return res.status(404).json({msg:"email already exist"})
        }

        const newUser = await new userSchema(req.body);
        // partie hedhi bech nest7a9ou lel bcrypt --> na3mlou cryptage lel password
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password,salt); // password hasher // crypté
        newUser.password = hash;
       
        // save mte3 user fel database
        newUser.save();
        res.status(200).json({msg:"registred with sucess :)",newUser})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"there is a problem to register "})
    }
}


// get users 

exports.getUser = async(req,res)=>{
    try {
        const users = await userSchema.find();
        res.status(200).json({msg:"list of users",users})
    } catch (error) {
        res.status(500).json({msg:"can not get the users"})
    }
}



// login 

exports.login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const exist = await userSchema.findOne({email});
        if(!exist){
            return res.status(404).json({msg:"wrong email or password"})
        }
        // password crypter 
        const match = await bcrypt.compare(password,exist.password);
        if(!match){
            return res.status(404).json({msg:"wrong email or  password"})
        }
        const payload = {id: exist._id};
        const token = jwt.sign(payload,process.env.privatekey);
        res.status(200).json({msg:"you did it welcome ",token})
    } catch (error) {
        res.status(500).json({msg:"you don't have permission"})
    }
}