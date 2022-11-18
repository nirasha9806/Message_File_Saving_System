import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login-component';
import FileUpload from './components/file-upload-component';
import MessageSave from './components/message-save-component';
import UsersList from './components/user-component';
import Add from './components/add-user';
import Dashoard from './components/dashboard';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashoard />} />
          <Route path='/file' element={<FileUpload />} />
          <Route path='/message' element={<MessageSave />} />
          <Route path='/users' element={<UsersList />} />
          <Route path='/add' element={<Add />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
