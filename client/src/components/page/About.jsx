import React from 'react'
import { Button,Row,Col } from 'react-bootstrap'

import { Link } from 'react-router-dom'


const About = () => {
  return (
    <Row className='mt-5'>
        <Col className='text-center'>
                <p>Click the button to back the dashboard</p>
                <Button variant='primary'>
                    <Link to ='/dashboard'>
                      back
                    </Link>
                 
                </Button>
        </Col>
        
    </Row>
  )
}

export default About