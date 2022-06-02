import { NavBarMenu } from "./NavBarMenu"
import { PostContext } from "../../Context/Postcontext"
import { AuthContext } from "../../Context/AuthContext";
import { useContext,useEffect } from "react"
import { Button, Card, Col, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import Sinlepost from "../posts/Sinlepost";
import AddpostModal from "../posts/AddpostModal"
import UpdatePostModal from "../posts/UpdatePostModal";
import addIcon from '../../assets/plus-circle-fill.svg'


const Dashboard = () => {
  // context 
  const  {user:{userName}} = useContext(AuthContext);  
  const {
    post,
    posts,
    postLoading,
    getAllPost,
    setShowAddPostModal

  } = useContext(PostContext);

  // start : get all post

  useEffect(()=>{
    getAllPost();
  },[])
 

  let body = null;

  if(postLoading){
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info"/>
      </div>
    )
  }else if(posts.length===0) {
    body = (
      <>
      
      <Card className="text-center mx-5 my-5">
        <Card.Header as='h1'>Hi {userName}</Card.Header>
        <Card.Body>
          <Card.Title>welcome to learn it </Card.Title>
          <Card.Text>
            Click the button below to track your first skill to learn 
          </Card.Text>
          <Button variant="primary" onClick={ ()=>setShowAddPostModal(true)}>LearnIt</Button>
        </Card.Body>
      </Card>
      </>
    )
  }else{
    body = (
     <>  
      <Row className="row-cols-1 row-cols-md-3 g-4  mx-auto  mt-3">
        {posts.map(post=>(
          <Col key={post._id} className = 'my-2'>
            <Sinlepost post = {post}/>
          </Col>
        ))}
      </Row>
      {/* open add post modal  */}
      <OverlayTrigger placement="left" overlay={<Tooltip> Add new posst</Tooltip>}>
      <Button className="btn-floating" onClick={ ()=>setShowAddPostModal(true)}>
        <img src={addIcon} alt="" width='60' height='60' />
      </Button>
      </OverlayTrigger>
     </>
    )
  }

  return (
  <> 
  <NavBarMenu/>
  {body}
  <AddpostModal/>
  {post !==null && <UpdatePostModal/>}
  </>
  )
 
}

export default Dashboard