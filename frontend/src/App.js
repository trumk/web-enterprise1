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
import AddFaculty from './pages/admin/faculty/add';
import { FacultyDetail } from './pages/admin/faculty/[id]/detail';
import EditFaculty from './pages/admin/faculty/[id]/edit';
import AddEvent from './pages/admin/event/add';
import { EventDetail } from './pages/admin/event/[id]/detail';
import EditEvent from './pages/admin/event/[id]/edit';
import { Contribution } from './pages/admin/contribution';
import { ContributionDetail } from './pages/admin/contribution/[id]/detail';
import { EnrollFaculty } from './pages/faculty/[id]/enroll';
import { FacultyMainPage } from './pages/faculty/[id]';
import { EventInfo } from './pages/faculty/[id]/event/[eventId]';

function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/terms" element={<Term />} />
        <Route path="/faculty/:id/enroll" element={<EnrollFaculty />} />
        <Route path="/faculty/:id" element={<FacultyMainPage />} />
        <Route path="faculty/:id/event/:id" element={<EventInfo />} />
        <Route path="/admin/users" element={<ManageUser />} />
        <Route path="/user/:id/profile" element={<UserProfile/>} />
        <Route path="/user/:id/changePassword" element={<ChangePassword/>} />
        <Route path="/user/:id/edit" element={<EditProfile/>} />
        <Route path="/admin/faculty" element={<Faculty/>} />
        <Route path="/admin/faculty/:id" element={<FacultyDetail/>} />
        <Route path="/admin/faculty/add" element={<AddFaculty/>} />
        <Route path="/admin/faculty/:id/edit" element={<EditFaculty/>} />
        <Route path="/admin/event" element={<Event/>} />
        <Route path="/admin/event/:id" element={<EventDetail/>} />
        <Route path="/admin/event/add" element={<AddEvent/>} />
        <Route path="/admin/event/:id/edit" element={<EditEvent/>}/>
        <Route path="/admin/contribution" element={<Contribution />} />
        <Route path='/admin/contribution/:id' element={<ContributionDetail />} />
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;