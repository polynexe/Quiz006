import React from 'react'
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import {Link} from 'react-router-dom';

function Services({ services }) {
  const ratingCount = services.numRatings ?? services.numReviews ?? 0;
  const serviceId = services._id ?? services.id;

  return (
    <Card className="my-3 p-3 rounded border shadow-sm">
        <Link to={`/services/${serviceId}`}>
            <Card.Img src={services.sample_image} />
        </Link>
        <Card.Body>
            <Link to={`/services/${serviceId}`}>
                <Card.Title as="div">
                    <strong>{services.service_name}</strong>
                </Card.Title>
            </Link>
        <Card.Text as="div">
            <div className="my-3">
                <Rating
                  value={services.rating}
                  text={` ${services.rating.toFixed(1)} (${ratingCount} ratings)`}
                  color="#f8e825"
                />
            </div>
        </Card.Text>
        <Card.Text as="p">{services.description}</Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Services