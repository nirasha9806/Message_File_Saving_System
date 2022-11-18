import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

export default function FileUpload() {
  return (
    <div>
      <div class='container mt-4'>
        <div class='row'>
          <div class='col-md-6 m-auto'>
          <Card>
            <Card.Body>
            <h3 class='text-center display-6 mb-4'>File Upload</h3>
            <div class="custome-file mb-3">
                <input type="file" name="file" id="file" class="custom-file-input"/>
                {/* <label for="file" class="custom-file-label">Choose File</label> */}
            </div>
            <div className="d-grid gap-2">
            <input type="submit" value="Upload" class="btn btn-primary btn-block"/>
            </div>
            </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
