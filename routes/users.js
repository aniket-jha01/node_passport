const { Router } = require('express');
const express = require('express');

const router = express.Router();
//Login page
router.get('/login',(req,res)=> res.render('login'));
//Register page
router.get('/register',(req,res)=> res.render('register'));

//Register handle
router.post('/register',(req,res)=>{
const {name,email,password,password2  }= req.body;

let errors = [];

//Check req fields
if(!name || !email || !password || !password2 ){
  errors.push({msg:'Please fill in all sections'});

}

//Check password match
if(password2!=password){
    errors.push({msg:"passwords do not match"});
}

if(password.length<5){
    errors.push({msg:"password should be atleast 5 characters "});

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
    res.send('Pass');
}
});
module.exports = router;
 