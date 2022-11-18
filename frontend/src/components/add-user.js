import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import services from '../services/Services';
import { useNavigate } from 'react-router-dom';

export default function Add() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const Add = async () => {
    let data = {
      username: username,
      email: email,
      userType: type,
    };

    let res = await services.register(data);

    navigate('/users');
  };

  return (
    <div>
      <div class='container mt-4'>
        <div class='row'>
          <div class='col-md-6 m-auto'>
            <Card>
              <Card.Body>
                <h3 class='text-center display-6 mb-4'>Add User</h3>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Username'
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>User Type</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='User Type'
                    value={type}
                    onChange={handleTypeChange}
                  />
                </Form.Group>
                <div className='d-grid gap-2'>
                  <input
                    type='submit'
                    value='Add'
                    class='btn btn-primary btn-block'
                    onClick={Add}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
