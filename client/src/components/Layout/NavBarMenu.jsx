import React, { useContext, useEffect,useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnitlogo from '../../assets/logo.svg'
import logouticon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const NavBarMenu = () => {
    const  {logOutUser,user:{userName}} = useContext(AuthContext);
    
   
   
    const navigate =  useNavigate()
    const logout = ()=>{
        logOutUser()
        navigate('/login')    
    }
  return (
    <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
        <Navbar.Brand className='font-weight-bolder text-white'>
            <img src={learnitlogo} alt="learnitlogo" width ='32' height='32' className='mr-2' />
            Leanr it 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
        <Navbar.Collapse id= 'basic-navbar-nav'>
            <Nav className='mr-auto'>
                <Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>
                    Dashboard
                </Nav.Link>
                <Nav.Link className='font-weight-bolder text-white' to='/about' as={Link}>
                    About
                </Nav.Link>
            </Nav>

            <Nav>
            <Nav.Link className='font-weight-bolder text-white' disabled>
                   welcome {userName}
                </Nav.Link>
                <Button variant='secondary' className='font-weight-bolder text-white'onClick={logout} >
                    <img src={logouticon} alt=""  width ='32' height='32' className='mr-2'/>
                    log out
                </Button>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
