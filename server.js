const express = require('express');
const dotenv=require('dotenv')
const morgan=require('morgan');
const bodyparser=require("body-parser");
const path=require('path');

const connectDB=require('./databaseConnection/database/connection')

const app=express();

dotenv.config({path:'config.env'})
const PORT= process.env.PORT || 8080

app.use(morgan("tiny"));

connectDB();

app.use(bodyparser.urlencoded({extended:true}))


app.set("view engine", "ejs")
//app.set("views",path.resolve(__dirname,"views"))


app.use('/css',express.static(path.resolve(__dirname,"assests/css")))
app.use('/img',express.static(path.resolve(__dirname,"assests/img")))
app.use('/js',express.static(path.resolve(__dirname,"assests/js")))

//load router
app.use('/',require('./modules/router'))
app.listen(3000,()=>{
    console.log(`Server is Running on http://localhost:${PORT}`);
})