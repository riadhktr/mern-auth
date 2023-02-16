const express = require('express');
const connection = require('./config/connectDb');
const userRoutes = require('./routes/userRoute');
const app = express();
const cors = require('cors');
const PORT = 5010;

app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    method:["GET","POST"],
    credentials:true
})) 
app.use('/api',userRoutes)

connection()
app.listen(PORT,(err)=>{
    err ? console.log(err) : console.log('server running in '+ PORT)
})