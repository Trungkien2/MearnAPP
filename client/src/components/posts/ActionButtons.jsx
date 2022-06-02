import React,{useContext} from 'react'
import playicon from '../../assets/play-btn.svg'
import editicon from '../../assets/pencil.svg'
import deleteicon from '../../assets/trash.svg'
import { Button } from 'react-bootstrap'
import { PostContext } from '../../Context/Postcontext'

const ActionButtons = ({url,_id}) => {
    const {deletePost,findPost,setShowUpdatePostModal} = useContext(PostContext);

    const choosePost = postId=>{
        findPost(postId)
        setShowUpdatePostModal(true)
    }
  return (
   <>
   <Button className='post-button' href={url} target='_blank'>
       <img src={playicon} alt="play" width='32' height='32' />
   </Button>
   <Button className='post-button'>
       <img src={editicon} alt="play" width='24' height='24' onClick={choosePost.bind(this,_id)} />
   </Button>
   <Button className='post-button'onClick={deletePost.bind(this,_id)}>
       <img src={deleteicon} alt="play" width='24' height='24' />
   </Button>
   </>
  )
}

export default ActionButtons