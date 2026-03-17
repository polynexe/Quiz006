import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { register, resetRegister } from '../actions/userRegisterActions';

const INITIAL_FORM_DATA = {
  email: '',
  username: '',
  phone_number: '',
  first_name: '',
  last_name: '',
  location: '',
  gender: '',
  password: '',
  confirm_password: '',
};

function RegisterModal({ show, onHide }) {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const [formData, setFormData] = useState({
    ...INITIAL_FORM_DATA,
  });
  const [localError, setLocalError] = useState('');

  const handleClose = () => {
    setLocalError('');
    setFormData(INITIAL_FORM_DATA);
    dispatch(resetRegister());
    onHide();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalError('');

    if (!passwordsMatch) {
      setLocalError('Passwords do not match.');
      return;
    }

    const payload = {
      email: formData.email,
      username: formData.username,
      phone_number: formData.phone_number,
      first_name: formData.first_name,
      last_name: formData.last_name,
      location: formData.location,
      gender: formData.gender,
      password: formData.password,
      merchant_id: '',
    };

    dispatch(register(payload));
  };

  useEffect(() => {
    if (userInfo) {
      const timeout = setTimeout(() => {
        setLocalError('');
        setFormData(INITIAL_FORM_DATA);
        dispatch(resetRegister());
        onHide();
      }, 1000);

      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [userInfo, dispatch, onHide]);

  const passwordsMatch = formData.password === formData.confirm_password;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {localError ? <Alert variant='danger'>{localError}</Alert> : null}
        {!localError && error ? <Alert variant='danger'>{error}</Alert> : null}
        {userInfo ? <Alert variant='success'>Registration successful. You can now log in.</Alert> : null}

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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
              required
            />
            {!passwordsMatch && formData.confirm_password ? (
              <div className='invalid-feedback'>Passwords do not match.</div>
            ) : null}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" type='submit' form='register-form' disabled={!passwordsMatch || loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterModal;