import React from 'react'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import services from '../services';
import Rating from './Rating';

function ServicesScreen() {
  const { id } = useParams();
  const service = services.find((item) => item._id === id || String(item.id) === id);
  const serviceId = service?._id ?? service?.id;

  if (!service) {
  return <h2>Service not found.</h2>;
  }

  return (
    <Row>
        <Col md={6}>
      <Image src={service.sample_image} alt={service.service_name} fluid rounded />
        </Col>
        <Col md={6}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h2>{service.service_name}</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Description:</strong> {service.description}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Rating:</strong>{' '}
          <Rating value={service.rating} text={` ${service.rating.toFixed(1)}`} color="#f8e825" />
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Price:</strong> ${service.price}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Duration of Service:</strong> {service.duration_of_service}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Sample Image:</strong>
          <div className="mt-3">
            <Image src={service.sample_image} alt={service.service_name} fluid rounded />
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Name of the Expert:</strong> {service.name_of_the_expert}
        </ListGroup.Item>
        <ListGroup.Item>
          <Button
            as={Link}
            to={`/appointment/${serviceId}`}
            variant="success"
            className="w-100"
          >
            Set an Appointment
          </Button>
        </ListGroup.Item>
      </ListGroup>
        </Col>
    </Row>
  )
}

export default ServicesScreen