import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

function Header() {
  const dispatch = useDispatch()
  const location = useLocation()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const isLoginRoute = location.pathname === '/login' || location.pathname === '/'

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Navbar expand="lg" bg="primary" variant="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">Accounting and Tax Services</Navbar.Brand>
        {!isLoginRoute ? (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {!userInfo ? (
                  <Nav.Link as={Link} to="/login"><i className="fas fa-user"></i>User</Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/login" onClick={logoutHandler}><i className="fas fa-sign-out-alt"></i>Logout</Nav.Link>
                )}
                <Nav.Link as={Link} to="/apply-seller"><i className="fas fa-store"></i>Become a Seller</Nav.Link>
                {userInfo && userInfo.isAdmin ? (
                  <Nav.Link as={Link} to="/users"><i className="fas fa-users"></i>Users</Nav.Link>
                ) : null}
              </Nav>
            </Navbar.Collapse>
          </>
        ) : null}
      </Container>
    </Navbar>
  )
}

export default Header