import { createContext, useReducer, useState } from "react";
import axios from "axios";
import { postReducer } from "../Reducer/postreducer";
import { apiUrl,localTokenName } from "../common/Common";
import { GET_POST_SUCCESS,ADD_POST, DELETE_POST,UPDATE_POST,FIND_POST} from "../common/Actions";

// init state
const initPostState = {
    post : null,
    posts : [],
    postLoading : true
}

export const PostContext = createContext();

 const PostContextProvider = ({children})=>{

    // state 
    const [showaddPostModal,setShowAddPostModal] = useState(false);
    const [showUpdatePostModal,setShowUpdatePostModal] = useState(false);

    const [postState,dispatch] = useReducer(postReducer,initPostState)

    // get all post

    const getAllPost = async()=>{
        try {
            const response = await axios.get(`${apiUrl}/post`)
            if(response.data.success){
                dispatch({type : GET_POST_SUCCESS, payload : response.data.post})
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    // add post 

    const addPost = async newPost=>{
        try {
            const response = await axios.post(`${apiUrl}/post`,newPost);
            if(response.data.success){
                dispatch({type : ADD_POST, payload : response.data.post})
                return response.data
            }
        } catch (error) {
            console.log(error);
        }
    }

    // delete posst

    const deletePost = async postId=>{
        try {
            const response = await axios.delete(`${apiUrl}/post/${postId}`);
            if(response.data.success){
                dispatch({type : DELETE_POST, payload : postId})
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    // update post 

    const updatePost = async updatePost =>{
        try {
            const response = await axios.put(`${apiUrl}/post/${updatePost._id}`);
            if(response.data.success){
                dispatch({type : UPDATE_POST, payload : updatePost})
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    // find post 

    const findPost =  postId => {
            const post = postState.posts.find(post=>post._id===postId)
          
             dispatch({type : FIND_POST, payload :post})
                
       
    }

    const postcontextData = {
        getAllPost,
        showaddPostModal,
        setShowAddPostModal,
        showUpdatePostModal,
        setShowUpdatePostModal,
        addPost,
        deletePost,
        updatePost,
        findPost,
        ...postState
    }

    return <PostContext.Provider value={postcontextData}>{children}</PostContext.Provider>
}



export default PostContextProvider