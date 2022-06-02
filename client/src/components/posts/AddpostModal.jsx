import React,{useContext,useState} from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PostContext } from "../../Context/Postcontext";

const AddpostModal = () => {
    const {  showaddPostModal,setShowAddPostModal,addPost} = useContext(PostContext)
    const [newPost, setNewPost] = useState({
        title : '',
        description : '',
        URL : '',
        status : 'TO LEARN'
    })
    const { title,description ,URL }= newPost
    const onCloseForm = ()=>{
        setNewPost({
            title : '',
            description : '',
            URL : '',
            status : 'TO LEARN'
        })
        setShowAddPostModal(false)
    }

    const onchangeNewPost = e=> setNewPost({...newPost,[e.target.name]: e.target.value})

    const onSubmitPost = async e =>{
        e.preventDefault();
        const {success,message} = await addPost(newPost)
        setNewPost({
            title : '',
            description : '',
            URL : '',
            status : 'TO LEARN'
        })
        setShowAddPostModal(false)
    }

  return (
    <Modal show={ showaddPostModal} onHide={onCloseForm}>
      <Modal.Header closeButton >
        <Modal.Title>What do you want to learn?</Modal.Title>
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
            />
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

export default AddpostModal;
