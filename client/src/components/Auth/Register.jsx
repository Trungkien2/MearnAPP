import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import AlertMessgae from "../Layout/AlertMessgae";

const Register = () => {
  // Context
  const { registerUser } = useContext(AuthContext);

  // local state

  const [registerForm, setRegisterForm] = useState({
    userName: "",
    passWord: "",
    confirmpassword: "",
  });
  const { userName, passWord, confirmpassword } = registerForm;

  const [alert, setAlert] = useState(null);

  const OnchangeRegisterFrom = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    if (passWord !== confirmpassword) {
      setAlert({
        type: "danger",
        message: "passWords is not match",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }

    try {
      const registerdata = await registerUser(registerForm);
      if (!registerdata.success) {
        setAlert({
          type: "danger",
          message: registerdata.message,
        });
        setTimeout(() => {
          setAlert(null);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessgae info = {alert}/>
        <Form.Group style={{ marginBottom: "10px" }}>
          <Form.Control
            type="text"
            placeholder="userName"
            name="userName"
            value={userName}
            onChange={ OnchangeRegisterFrom}
            required
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "10px" }}>
          <Form.Control
            type="password"
            placeholder="password"
            name="passWord"
            value={passWord}
            onChange={ OnchangeRegisterFrom}
            required
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "10px" }}>
          <Form.Control
            type="password"
            placeholder="confirm  password"
            name="confirmpassword"
            value={confirmpassword}
            onChange={ OnchangeRegisterFrom}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        ALREADY HAVE AN ACCOUNT ?
        <Link to="/login" style={{ marginLeft: "10px" }}>
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>{" "}
        </Link>
      </p>
    </>
  );
};

export default Register;
