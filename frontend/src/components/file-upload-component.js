import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import services from '../services/Services';

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0])
  };

  const upload = () => {
    const formData = new FormData();
    formData.append('file', file);

    services.uploadFile(formData);
    alert('File uploaded successfully');
  };

  return (
    <div>
      <div class='container mt-4'>
        <div class='row'>
          <div class='col-md-6 m-auto'>
            <Card>
              <Card.Body>
                <h3 class='text-center display-6 mb-4'>File Upload</h3>
                <div class='custome-file mb-3'>
                  <input
                    type='file'
                    name='file'
                    id='fileInput'
                    class='custom-file-input'
                    onChange={handleFileChange}
                  />
                </div>
                <div className='d-grid gap-2'>
                  <input
                    type='submit'
                    value='Upload'
                    class='btn btn-primary btn-block'
                    onClick={upload}
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
