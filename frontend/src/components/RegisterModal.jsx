import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function RegisterModal({ show, onHide }) {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phone_number: '',
    first_name: '',
    last_name: '',
    location: '',
    gender: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const passwordsMatch = formData.password === formData.confirm_password;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id='register-form' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='register-email' className='form-label'>Email</label>
            <input
              type='email'
              className='form-control'
              id='register-email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='register-username' className='form-label'>Username</label>
            <input
              type='text'
              className='form-control'
              id='register-username'
              name='username'
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='register-phone-number' className='form-label'>Phone Number</label>
            <input
              type='tel'
              className='form-control'
              id='register-phone-number'
              name='phone_number'
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='register-first-name' className='form-label'>First Name</label>
            <input
              type='text'
              className='form-control'
              id='register-first-name'
              name='first_name'
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='register-last-name' className='form-label'>Last Name</label>
            <input
              type='text'
              className='form-control'
              id='register-last-name'
              name='last_name'
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='register-location' className='form-label'>Location</label>
            <input
              type='text'
              className='form-control'
              id='register-location'
              name='location'
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='register-gender' className='form-label'>Gender</label>
            <select
              className='form-select'
              id='register-gender'
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              required
            >
                <option value='' disabled>Choose...</option>
              <option value='female'>Female</option>
              <option value='male'>Male</option>
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor='register-password' className='form-label'>Password</label>
            <input
              type='password'
              className='form-control'
              id='register-password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-0'>
            <label htmlFor='register-confirm-password' className='form-label'>Confirm Password</label>
            <input
              type='password'
              className={`form-control${!passwordsMatch && formData.confirm_password ? ' is-invalid' : ''}`}
              id='register-confirm-password'
              name='confirm_password'
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
            {!passwordsMatch && formData.confirm_password ? (
              <div className='invalid-feedback'>Passwords do not match.</div>
            ) : null}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" type='submit' form='register-form' disabled={!passwordsMatch}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterModal;