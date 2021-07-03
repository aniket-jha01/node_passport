
const express = require('express');

const bcrypt = require('bcryptjs')
const router = express.Router();

//Usermodel
const User = require('../models/User');

//Login page
router.get('/login',(req,res)=> res.render('login'));
//Register page
router.get('/register',(req,res)=> res.render('register'));

//Register handle
router.post('/register',(req,res)=>{
const {name,email,password,password2}= req.body;

let errors = [];

//Check req fields
if(!name || !email || !password || !password2 ){
  errors.push({msg:'Please fill in all sections'});

}

//Check password match
if(password!==password2){
    errors.push({msg:'passwords do not match'});
}

if(password.length<5){
    errors.push({msg:'password should be atleast 5 characters '});

}

if(errors.length>0){
    res.render('register',{
        errors,
        name,
        email,
        password,
        password2
    });
}
else{
    //Validation passed
    User.findOne({email:email})
     .then(user=>{
        if(user){
            errors.push({msg:'email is already registered'})
         //signifies user exists
         res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
        }else{
            const newUser = new User({
                name,
                email,
                password
            });
            console.log(newUser)
             res.send('Hello');
        }
    })

}
});
module.exports = router;
 