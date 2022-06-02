const Post = require("../Models/PostModel");
const {commonMessage,commonResults} = require('../Common/common')

exports.createPost = async (req, res) => {
  const { title, desc, URL, Status } = req.body;
  // simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: commonResults.fail, message: "title is requierd" });
  }
  try {
    const newPost = await  Post.create({
      title,
      desc,
      URL: URL.startsWith("https://") ? URL : `https://${URL}`,
      Status: Status || "TO LEARN",
      user: req.userID,
    });
    

    return res.json({
      success: true,
      message: "HAPPY LEARNING",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: commonResults.fail,
        message: commonMessage.serverBroken,
      });
  }
};

exports.getAllPost = async (req, res) => {
  try {
   
    const post = await Post.find({ user: req.userID }).populate("user", [
      "userName",
    ]);
   
    return res.json({
      success: true,
      post
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: commonResults.fail,
        message: commonMessage.serverBroken,
      });
  }
};

exports.updateSinglePost =async (req, res) => {
  const { title, desc, URL, Status } = req.body;
  // simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: commonResults.fail, message: "title is requierd" });
  }
  try {
   let updatePost = {
      title,
      desc :desc || '',
      URL: URL.startsWith("https://") ? URL : `https://${URL}` || '',
      Status: Status || "TO LEARN",
    };
    
    const postUpdateCondition = {_id : req.params.id, user : req.userID}

    updatePost = await Post.findOneAndUpdate(postUpdateCondition,updatePost, {new : true});

    // user not Authorization to update post  or post not found
    if(!updatePost){
      return res.status(401).json({success : commonResults.fail , message : 'post not found or user not Authorization '})
    }

    res.json({success : true , message : 'Excellent progress ', post : updatePost})
    
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: commonResults.fail,
        message: commonMessage.serverBroken,
      });
  }
};


exports.deletePost =async (req,res)=>{

  try {
    const postDeleteCondition = {id : req.params.id, user : req.userID};
    const deletePost = await Post.findOneAndDelete(postDeleteCondition);

    if(!deletePost){
      return res.status(401).json({success : commonResults.fail , message : 'post not found or user not Authorization '})
    }

    res.json({success : true , message : 'Excellent progress ', post : deletePost})

  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: commonResults.fail,
        message: commonMessage.serverBroken,
      });
  }
}