import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import services from '../services/Services';

export default function MessageSave() {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const save = () => {
    let data = {
      message: message,
    };
    services.saveMessage(data);

    alert('Message Saved Successfully');
    setMessage('');
  };

  return (
    <div>
      <div class='container mt-4'>
        <div class='row'>
          <div class='col-md-6 m-auto'>
            <Card>
              <Card.Body>
                <h3 class='text-center display-6 mb-4'>Message Saving</h3>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Mesage</Form.Label>
                  <Form.Control
                    type='message'
                    placeholder='Message'
                    value={message}
                    onChange={handleMessageChange}
                  />
                </Form.Group>
                <div className='d-grid gap-2'>
                  <input
                    type='submit'
                    value='Save'
                    class='btn btn-primary btn-block'
                    onClick={save}
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
