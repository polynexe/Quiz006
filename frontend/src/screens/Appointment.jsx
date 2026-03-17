import React from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import services from '../services';

function Appointment() {
  const { id } = useParams();
  const service = services.find((item) => item._id === id || String(item.id) === id);

  return (
    <Card className="p-4 shadow-sm">
      <h2 className="mb-3">Appointment</h2>
      <p className="mb-0">You are scheduling an appointment for service <strong>{service.service_name}</strong></p>
    </Card>
  );
}

export default Appointment;
