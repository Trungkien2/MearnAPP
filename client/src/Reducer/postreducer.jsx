import { GET_POST_SUCCESS,ADD_POST, DELETE_POST,UPDATE_POST,FIND_POST} from "../common/Actions"

export const postReducer = (state,action)=>{

    const {type,payload} = action
    
    switch (type) {
        case GET_POST_SUCCESS:
            return {
                ...state,
                posts : payload,
                postLoading : false
            }        
        case ADD_POST:
            return {
                ...state,
                posts : [...state.posts,payload]
            }
        case DELETE_POST:
            const newPosts =state.posts.filter(post=>post._id!==payload)
            return {
                ...state,
                posts : newPosts
            }
        case UPDATE_POST:
            const newPost = state.posts.map(post=>post._id===payload._id ? payload : post)
            return {...state, posts : newPost}
        case FIND_POST : 
            return {...state,post : payload}
        default:
            return state
    }

}