const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();

// Passport Config
require('./config/passport')(passport);

//DBconfif
const db =require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db,{useNewUrlParser:true})
.then(()=>console.log('MongoDB connected')) 
.catch(err => console.log(err));




//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body-parser now inbuilt in express
app.use(express.urlencoded({extended:false}))

//Express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
   
  }))
  //passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  //connetflash
  app.use(flash());

  //some variable
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

 


app.use('/',require('./routes/index'));

app.use('/users',require('./routes/users'));

const PORT= process.env.PORT || 5500 ;

app.listen(PORT,console.log(`Server started on port ${PORT}`)); 