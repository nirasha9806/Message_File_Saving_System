import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function Dashoard() {
  const [type, setType] = useState('');
  const navigate = useNavigate();
  React.useEffect(() => {
    setType(window.sessionStorage.getItem('userType'));
  });

  const msg = () => {
    navigate('/message');
  };

  const file = () => {
    navigate('/file');
  };

  return (
    <div>
      <div class='container mt-4'>
        <div class='row'>
          <div class='col-md-6 m-auto'>
            <Card>
              <Card.Body class='m-auto'>
                <h3 class='text-center display-6 mb-4'>Dashboard</h3>
                {type === 'Manager' ? (
                  <Card.Body>
                    <Card.Title>Save Message</Card.Title>

                    <Button variant='primary' onClick={msg}>
                      Go
                    </Button>
                  </Card.Body>
                ) : (
                  <></>
                )}
                <Card.Body>
                  <Card.Title>Upload Files</Card.Title>
                  <Button variant='primary' onClick={file}>
                    Go
                  </Button>
                </Card.Body>
                {/* </Card> */}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashoard;
