import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import AlertMessgae from "../Layout/AlertMessgae";

const LoginFrom = () => {
  // Context
  const { login } = useContext(AuthContext);

  // local state 

  const [loginForm, setLoginForm] = useState({
    userName: "",
    passWord: "",
  });


  const [alert,setAlert] = useState(null);

  let navigate = useNavigate();

  const OnchangeLoginFrom = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const data = await login(loginForm);
      if (data.success) {
        navigate("/dashboard");
      }else{
        setAlert({
          type : 'danger',
          message : data.message
        })
        setTimeout(()=>{
          setAlert(null)
        },2000)
      }
     
    } catch (error) {
          console.log(error);
    }
  };
  return (
    <>
      <Form className="my-4" onSubmit={loginUser}>
        <AlertMessgae info = {alert}/>
        <Form.Group style={{ marginBottom: "10px" }}>
          <Form.Control
            type="text"
            placeholder="userName"
            name="userName"
            value={loginForm.userName}
            onChange={OnchangeLoginFrom}
            required
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "10px" }}>
          <Form.Control
            type="password"
            placeholder="password"
            name="passWord"
            value={loginForm.passWord}
            onChange={OnchangeLoginFrom}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        DO NOT HAVE ACCOUNT ?
        <Link to="/register" style={{ marginLeft: "10px" }}>
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>{" "}
        </Link>
      </p>
    </>
  );
};

export default LoginFrom;
