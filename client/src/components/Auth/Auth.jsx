import React, { useContext } from 'react'
import LoginFrom from './LoginFrom'
import Register from './Register'
import {AuthContext} from '../../Context/AuthContext'
import {useNavigate} from 'react-router-dom'
import  Spinner  from 'react-bootstrap/Spinner'

const Auth = ({AuthRoute}) => {
  const { authLoading,isAuthenticated} = useContext(AuthContext);
  
 const Navigate = useNavigate();

  if(authLoading){
   return ( <div className="d-flex justify-content-center mt-2">
   <Spinner animation='border' variant = 'info'/>
 </div>)
  }
  else if(isAuthenticated) return Navigate('/dashboard')
  else{
    return (
      <div className='landing'>
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1>Learn it</h1>
            <h4>keep track of what you are learning</h4>
              
              {AuthRoute === 'login' && <LoginFrom/>}
              {AuthRoute === 'register' && <Register/>}
          </div>
        </div>
      </div>
    )
  }
  
}

export default Auth