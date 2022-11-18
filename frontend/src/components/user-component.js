import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Card from 'react-bootstrap/Card';
import services from '../services/Services';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'username', headerName: 'Username' },
  { field: 'email', headerName: 'Email', width:250},
  { field: 'userType', headerName: 'User Type' },
];

export default function UsersList() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    getUsers();
  });

  const getUsers = async () => {
    let res = await services.getusers();
    let array = [];
    res.data.userDetails.forEach((item) => {
      let objectArray = {
        id: item._id,
        username: item.username,
        email: item.email,
        userType: item.userType,
      };
      array.push(objectArray);
    });
    setRows(array);
  };

  const add = () =>{
    navigate('/add')
  }
  return (
    <div>
      <div class='container mt-4'>
        <div class='row'>
          <div class='col-md-10 m-auto'>
            <Card>
              <Card.Body>
                <h3 class='text-center display-6 mb-4'>Users</h3>
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                  />
                </div>
                <div className='m-auto'>
                  <input
                    type='submit'
                    value='Add Users'
                    class='btn btn-primary btn-block'
                    onClick={add}
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
