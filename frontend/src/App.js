import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import { Homepage } from "./pages/Homepage";
import 'react-toastify/dist/ReactToastify.css';
import { UserProfile } from "./pages/user/[id]/profile";
import { Term } from "./pages/Term";
import { ChangePassword } from "./pages/user/[id]/changePassword";
import { EditProfile } from "./pages/user/[id]/edit";
import { Faculty } from "./pages/admin/faculty";
import { Event } from "./pages/admin/event";
import AddFaculty from "./pages/admin/faculty/add";
import { FacultyDetail } from "./pages/admin/faculty/[id]/detail";
import EditFaculty from "./pages/admin/faculty/[id]/edit";
import AddEvent from "./pages/admin/event/add";
import { EventDetail } from "./pages/admin/event/[id]/detail";
import EditEvent from "./pages/admin/event/[id]/edit";
import { Contribution } from "./pages/admin/contribution";
import { ContributionDetail } from "./pages/admin/contribution/[id]/detail";
import { User } from "./pages/admin/user";
import { EnrollFaculty } from "./pages/faculty/[facultyId]/enroll";
import { FacultyMainPage } from "./pages/faculty/[facultyId]";
import { EventInfo } from "./pages/faculty/[facultyId]/event/[eventId]";
import { SubmitContribution } from "./pages/faculty/[facultyId]/event/[eventId]/contribution/submit";
import { ReadContribution } from "./pages/faculty/[facultyId]/event/[eventId]/contribution/[contributionId]/read";
import { MarketingCoordinatorPage } from "./pages/marketingCoordinator";
import { MarketingManagerPage } from "./pages/marketingManager";
import { FacultyManager } from "./pages/marketingManager/faculty";
import { FacultyDetailManager } from "./pages/marketingManager/[id]/detailFaculty";
import { EventDetailManager } from "./pages/marketingManager/[id]/eventDetail";
import { ContributionDetailManager } from "./pages/marketingManager/[id]/contributionDetail";
import { MyContributionPage } from "./pages/userContribution";
import { EditContribution } from "./pages/userContribution/[id]/edit";
import { ManageContribution } from "./pages/marketingCoordinator/contribution/[id]/action";
import { ToastContainer } from 'react-toastify';
import { ExceptionContribution } from "./pages/marketingCoordinator/exception";
import { PrivateRoute } from "./components/authorization/private-routes";
import { useSelector } from "react-redux";
import { ContributionsDashboard } from "./pages/contributions";

function App() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  return (
    <>
    <ToastContainer/>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/terms" element={<Term />} />
          <Route path="/faculty/:facultyId/enroll" element={<EnrollFaculty />} />
          <Route path="/faculty/:facultyId" element={<FacultyMainPage />} />
          <Route path="/faculty/:facultyId/event/:eventId" element={<EventInfo />} />
          <Route path="/faculty/:facultyId/event/:eventId/contribution/submit" element={<SubmitContribution />} />
          <Route path="/faculty/:facultyId/event/:eventId/contribution/:contributionId/read" element={<ReadContribution />} />
          <Route path="/user/:id/profile" element={<UserProfile />} />
          <Route path="/user/:id/changePassword" element={<ChangePassword />} />
          <Route path="/user/:id/edit" element={<EditProfile />} />
          <Route path="/userContribution" element={<MyContributionPage/>}/>
          <Route path="/userContribution/:id/edit" element={<EditContribution/>}/>
          <Route path="/contributions" element={<ContributionsDashboard/>}/>
          {/* Marketing Manager */}
          <Route path="/marketingManager" element={<PrivateRoute userRole={user?.role} path="/marketingManager" element={<MarketingManagerPage />} />}/>
          <Route path="/marketingManager/faculty" element={<PrivateRoute userRole={user?.role} path="/marketingManager" element={<FacultyManager />} />}/>
          <Route path="/marketingManager/faculty/:id" element={<PrivateRoute userRole={user?.role} path="/marketingManager" element={<FacultyDetailManager />} />}/>
          <Route path="/marketingManager/event/:id" element={<PrivateRoute userRole={user?.role} path="/marketingManager" element={<EventDetailManager />} />}/>
          <Route path="/marketingManager/contribution/:id" element={<PrivateRoute userRole={user?.role} path="/marketingManager" element={<ContributionDetailManager />} />}/>
          {/* Marketing Coordinator */}
          <Route path="/marketingCoordinator" element={<PrivateRoute userRole={user?.role} path="/marketingCoordinator" element={<MarketingCoordinatorPage />} />}/>
          <Route path="/marketingCoordinator/contribution/:id/action" element={<PrivateRoute userRole={user?.role} path="/marketingCoordinator" element={<ManageContribution />} />}/>
          <Route path="/marketingCoordinator/exception" element={<PrivateRoute userRole={user?.role} path="/marketingCoordinator" element={<ExceptionContribution />} />}/>
          {/* Admin Route */}
          <Route path="/admin/faculty" element={<PrivateRoute userRole={user?.role} path="/admin" element={<Faculty />} />} />
          <Route path="/admin/faculty/:id" element={<PrivateRoute userRole={user?.role} path="/admin" element={<FacultyDetail />} />} />
          <Route path="/admin/faculty/add" element={<PrivateRoute userRole={user?.role} path="/admin" element={<AddFaculty />} />} />
          <Route path="/admin/faculty/:id/edit" element={<EditFaculty />} />
          <Route path="/admin/event" element={<PrivateRoute userRole={user?.role} path="/admin" element={<Event />} />} />
          <Route path="/admin/event/:id" element={<PrivateRoute userRole={user?.role} path="/admin" element={<EventDetail />} />} />
          <Route path="/admin/event/add" element={<PrivateRoute userRole={user?.role} path="/admin" element={<AddEvent />} />} />
          <Route path="/admin/event/:id/edit" element={<PrivateRoute userRole={user?.role} path="/admin" element={<EditEvent />} />} />
          <Route path="/admin/contribution" element={<PrivateRoute userRole={user?.role} path="/admin" element={<Contribution />} />} />
          <Route path="/admin/contribution/:id" element={<PrivateRoute userRole={user?.role} path="/admin" element={<ContributionDetail />} />} />
          <Route path="/admin/user/" element={<PrivateRoute userRole={user?.role} path="/admin" element={<User />} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
