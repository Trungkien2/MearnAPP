const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    userName : {
        type :String,
        required: true,
        unique : true
    },
    passWord : {
        type: String,
        required : true
    },
    createAt : {
        type : Date,
        default : Date.now
    }
})

 const Users = mongoose.model('Users',userSchema);



 module.exports = Users;