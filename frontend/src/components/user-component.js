import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'username', headerName: 'Username', width: 70 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'userType', headerName: 'User Type', width: 130 },
  
];

const rows = [
  {  username: 'Snow', email: 'Jon', userType: 35 },
  {  username: 'Lannister', email: 'Cersei', userType: 42 },
];

export default function UsersList() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}