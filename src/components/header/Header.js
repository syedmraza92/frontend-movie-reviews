import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';


const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
  
    useEffect(() => {

      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });

      return () => unsubscribe();
    }, []);
  
    const handleSignUp = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User signed up:', user);
        setShowSignUpModal(false);
      } catch (error) {
        console.error('Error signing up:', error.message);
      }
    };
  
    const handleLogin = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User logged in:', user);
        setShowLoginModal(false);
      } catch (error) {
        console.error('Error logging in:', error.message);
      }
    };
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    };
  
    const handleShowLoginModal = () => setShowLoginModal(true);
    const handleHideLoginModal = () => setShowLoginModal(false);
  
    const handleShowSignUpModal = () => setShowSignUpModal(true);
    const handleHideSignUpModal = () => setShowSignUpModal(false);
  
    return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: '#0dcaf0' }}>
          <FontAwesomeIcon icon={faPizzaSlice} /> PizzaReel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/watchList">
              Watch List
            </NavLink>
          </Nav>
          {user ? (
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              <span className="me-2">{user.email}</span>
              <Button variant="outline-info" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline-info" className="me-2" onClick={handleShowLoginModal}>
                Login
              </Button>
              <Button variant="outline-info" onClick={handleShowSignUpModal}>
                Register
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleHideLoginModal}>
        <Modal.Header closeButton style={{ backgroundColor: 'black', color: '#0dcaf0' , borderBottom: '3px solid #0dcaf0',borderTopLeftRadius: '10px', borderTopRightRadius: '10px', border: '1px solid white'}}>
          <Modal.Title style={{ fontWeight: 'bold' }}>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'black', color: '#0dcaf0' , borderBottom: '3px solid #0dcaf0',borderTopLeftRadius: '10px', borderTopRightRadius: '10px', border: '1px solid white'}}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" onClick={handleLogin} style={{ marginTop: '10px' }}>
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Sign Up Modal */}
      <Modal show={showSignUpModal} onHide={handleHideSignUpModal}>
        <Modal.Header closeButton style={{ backgroundColor: 'black', color: '#0dcaf0' , borderBottom: '3px solid #0dcaf0',borderTopLeftRadius: '10px', borderTopRightRadius: '10px', border: '1px solid white'}}>
          <Modal.Title style={{ fontWeight: 'bold' }}>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'black', color: '#0dcaf0', borderBottom: '3px solid #0dcaf0',borderTopLeftRadius: '10px', borderTopRightRadius: '10px', border: '1px solid white'}}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" onClick={handleSignUp} style={{ marginTop: '10px' }}>
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
