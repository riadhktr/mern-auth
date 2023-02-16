const mongoose = require('mongoose');

require('dotenv').config();

const URI = process.env.MONGO_URI;

const connection = async()=>{
try {
    await mongoose.connect(URI,{useNewUrlParser:true, useUnifiedTopology:true});
    console.log('connected to the database');
} catch (error) {
    console.log(error);
}
}



module.exports = connection;