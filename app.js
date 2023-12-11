// Import the 'dotenv' package to load environment variables from a .env file
require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const ejs = require('ejs');
const mongoose = require("mongoose");

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 1000;


mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch(()=>{
    console.log("Failed to connect MongoDB", err);
})

const dataSchema = new mongoose.Schema({
    otp: Number
});

const Data = mongoose.model("Data", dataSchema);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.get("/", async (req,res)=>{

  const otp = 0;
  try{
    const getotp = await Data.find();
    const otp = getotp[0].otp;
    console.log("OTP is: " ,otp);
    res.render('index', {OTP: otp});

}catch(error){
    throw new Error(error);
    res.render('index', {OTP: ""});

}
});



app.listen(PORT, (req,res)=>{
    console.log(`Server is running at PORT: ${PORT}`);
});