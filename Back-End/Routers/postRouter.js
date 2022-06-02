const express = require('express');
const PostController = require('../Controllers/PostController');
const verifiToken = require('../middleware/auth')

const router = express.Router();

const {createPost,getAllPost,updateSinglePost,deletePost } = PostController;

// get and post tour
// router.route('/').post(verifiToken,createPost).get(verifiToken,getAllPost);

router.get('/',verifiToken,getAllPost)
router.post('/',verifiToken,createPost)

// update single post
router.put('/:id',verifiToken,updateSinglePost)

// delele
router.delete('/:id',verifiToken,deletePost )
module.exports = router