import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Form, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function ApplySeller() {
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [userInfo, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!reason.trim()) {
      setError('Please provide a reason for becoming a seller.')
      return
    }

    try {
      setLoading(true)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}`
        }
      }
      
      const { data } = await axios.post(
        'http://127.0.0.1:8000/api/apply-seller/',
        { seller_application_reason: reason },
        config
      )
      
      setSuccess(true)
      setReason('')
      setTimeout(() => {
        navigate('/home')
      }, 2000)
    } catch (error) {
      setError(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormContainer>
      <h1>Apply to Become a Seller</h1>
      
      {error && (
        <Alert variant='danger' className='mb-4'>
          <strong>Error: </strong>{error}
        </Alert>
      )}

      {success && (
        <Alert variant='success' className='mb-4'>
          <strong>Success! </strong>Your seller application has been submitted. Our admin team will review it shortly.
        </Alert>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='reason'>
          <Form.Label>Why do you want to become a seller?</Form.Label>
          <Form.Control
            as='textarea'
            rows={5}
            placeholder='Tell us about your experience, services you offer, and why you want to join as a seller...'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={loading}
          />
          <Form.Text className='text-muted'>
            Please provide a clear explanation of your background and the services you plan to offer.
          </Form.Text>
        </Form.Group>

        <Button variant='primary' type='submit' disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ApplySeller
