import logo from "./logo.svg";
import "./App.css";

import { Routes, Route,useNavigate, Navigate } from "react-router-dom";
import Landing from "./components/Layout/Landing";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Layout/Dashboard";
import About from "./components/page/About";
import { useContext, useState } from "react";
import { AuthContext } from "./Context/AuthContext";



function App() {
  const {user} = useContext(AuthContext);
 
  const navigate = useNavigate();


 

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Landing/>}/>
          {!user && (<>
            <Route path="/login" element={<Auth AuthRoute = 'login'/>}/>
          <Route path="/register" element={<Auth AuthRoute = 'register'/>}/>
          </>)}
          {user && ( <>
            <Route path="/dashboard" element={  <Dashboard/> }/>
          <Route path="/about" element={  <About/> }/>
          </>)}

          <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'}/>}/>
      </Routes>
         
    </div>
  );
}

export default App;
