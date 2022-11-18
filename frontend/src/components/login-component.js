import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import services from '../services/Services';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    let data = {
      username: username,
      password: password,
    };

    let res = await services.login(data);
    console.log(res)
    if (res.status === 400) {
      alert(res.data.message);
    }

    if (res.status === 200) {
      window.sessionStorage.setItem('token', res.data.user.token);
      navigate("/message")
    }
  };

  return (
    <div>
      <div class='container mt-4'>
        <div class='row'>
          <div class='col-md-6 m-auto'>
            <Card>
              <Card.Body>
                <h3 class='text-center display-6 mb-4'>Login</h3>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter Username'
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <div className='d-grid gap-2'>
                  <input
                    type='submit'
                    value='Login'
                    class='btn btn-primary btn-block'
                    onClick={login}
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
