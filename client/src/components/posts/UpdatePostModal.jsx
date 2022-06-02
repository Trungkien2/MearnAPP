import React,{useContext,useState,useEffect} from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PostContext } from "../../Context/Postcontext";

const UpdatePostModal = () => {
    const { post, showUpdatePostModal,
        setShowUpdatePostModal,updatePost} = useContext(PostContext)
    const [newPost, setNewPost] = useState(post)
    useEffect(()=>setNewPost(post),[post])
    const { title,description ,URL, Status }= newPost
    const onCloseForm = ()=>{ 
        setNewPost(post)
        setShowUpdatePostModal(false)
    }

    const onchangeNewPost = e=> setNewPost({...newPost,[e.target.name]: e.target.value})

    const onSubmitPost = async e =>{
        e.preventDefault();
        await updatePost(newPost)
        setShowUpdatePostModal(false)
    }

  return (
    <Modal show={ showUpdatePostModal} onHide={onCloseForm}>
      <Modal.Header closeButton >
        <Modal.Title>Making progress</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmitPost}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onchangeNewPost}
            />
            <Form.Text id="title-help" muted>
              {" "}
              Required
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="description"
              name="description"
              value={description}
              onChange={onchangeNewPost}
              className="my-3"
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Link youtube channel"
              name="URL"
              value={URL}
              onChange={onchangeNewPost}
              className='my-3'
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
                as='select'
              name="status"
              value={Status}
              onChange={onchangeNewPost}
            >
            <option value="TO LEARN">TO LEARN</option>
            <option value="LEARNNING">LEARNNING</option>
            <option value="LEARNED"> LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onCloseForm}>Cancel</Button>
            <Button variant="primary" type="submit" >Learn It !</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
