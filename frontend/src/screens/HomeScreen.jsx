import React from 'react'
import services from '../services';
import { Row, Col } from 'react-bootstrap';
import Services from './Services';
import Chatbox from './Chatbox';

function HomeScreen() {
  return (
    <div>
        <h1>Our Services</h1>
        <Row>
            {services.map(service => (
            <Col sm={12} md={6} lg={4} xl={3} key={service._id ?? service.id}>
                    <Services services={service} />
                </Col>
            ))}
        </Row>
      <Chatbox />
    </div>
  )
}

export default HomeScreen