import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import { Homepage } from './pages/Homepage';
import "react-toastify/dist/ReactToastify.css";
import { ManageUser } from './pages/admin/users';
import { UserProfile } from './pages/user/[id]/profile';
import { Term } from './pages/Term';
import { ChangePassword } from './pages/user/[id]/changePassword';
import { EditProfile } from './pages/user/[id]/edit';
import { Faculty } from './pages/admin/faculty';
import { Event } from './pages/admin/event';

function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/terms" element={<Term />} />
        <Route path="/admin/users" element={<ManageUser />} />
        <Route path="/user/:id/profile" element={<UserProfile/>} />
        <Route path="/user/:id/changePassword" element={<ChangePassword/>} />
        <Route path="/user/:id/edit" element={<EditProfile/>} />
        <Route path="/admin/faculty" element={<Faculty/>} />
        <Route path="/admin/event" element={<Event/>} />
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;