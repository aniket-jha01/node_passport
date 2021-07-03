const mongoos = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        "type": String,
        "required": True 


    },
    email: {
        "type": String,
        "required": True


    },
    password : {
        "type": String,
        "required": True


    },
    date : {
        "type": String,
        "default": Date.now


    }
});

const User =mongoose.model('User','UserSchema');
module.exports = User;