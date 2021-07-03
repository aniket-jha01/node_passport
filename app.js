const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express();

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

 


app.use('/',require('./routes/index'));

app.use('/users',require('./routes/users'));

const PORT= process.env.PORT || 5000 ;

app.listen(PORT,console.log(`Server started on port ${PORT}`));