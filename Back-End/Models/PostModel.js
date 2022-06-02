const mongoose = require('mongoose');




const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    desc : {
        type: String,
    },
    URL : {
        type: String
    },
    Status : {
        type: String,
        enum : ['TO LEARN','LEARNING','LEARNED']
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'Users'
    }

})


const Post = mongoose.model('Post',postSchema);

module.exports = Post;