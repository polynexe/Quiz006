import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import RegisterModal from '../components/RegisterModal'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Alert } from 'react-bootstrap'

function LoginScreen() {
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const openRegisterModal = (event) => {
    event.preventDefault()
    setShowRegisterModal(true)
  }

  const closeRegisterModal = () => setShowRegisterModal(false)


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo, error} = userLogin;
    let navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted');
        dispatch(login(email, password));
    }

    useEffect(() => {
        if (userInfo) {
            navigate('/home')
        }
    }, [userInfo, navigate])

  return (
    <>
      <FormContainer>
          <h1>Login ˙𐃷˙</h1>

        {error && (
            <Alert variant='danger' className='mb-4'>
                <strong>AWOOP! {error} </strong>
                <hr />
                <p className='mb-0'>If you don't have an account yet, you need to create a <strong>superuser</strong> first and use those credentials to login. TRY AGAIN ｡𖦹°‧</p>
            </Alert>
        )}

          <Form onSubmit={submitHandler}>

            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter password' value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

              <Button type='submit' variant='primary' className='w-100'>Log In</Button>

              <div className='mt-3'>
                  <a href='/register' onClick={openRegisterModal}>Don't have an account? Register</a>
              </div>
          </Form>
      </FormContainer>
      <RegisterModal show={showRegisterModal} onHide={closeRegisterModal} />
    </>
  )
}

export default LoginScreen