import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import { Homepage } from "./pages/Homepage";
import "react-toastify/dist/ReactToastify.css";
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
import { UserDetail } from "./pages/admin/user/[id]/detail";
import { EditUser } from "./pages/admin/user/[id]/edit";
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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/terms" element={<Term />} />
          <Route path="/faculty/:facultyId/enroll" element={<EnrollFaculty />} />
          <Route path="/faculty/:facultyId" element={<FacultyMainPage />} />
          <Route path="/faculty/:facultyId/event/:eventId" element={<EventInfo />} />
          <Route
            path="/faculty/:facultyId/event/:eventId/contribution/submit"
            element={<SubmitContribution />}
          />
          <Route
            path="/faculty/:facultyId/event/:eventId/contribution/:contributionId/read"
            element={<ReadContribution />}
          />
          {/* User Route */}
          <Route path="/user/:id/profile" element={<UserProfile />} />
          <Route path="/user/:id/changePassword" element={<ChangePassword />} />
          <Route path="/user/:id/edit" element={<EditProfile />} />
          {/* Marketing Manager */}
          <Route path="/marketingManager" element={<MarketingManagerPage/>}/>
          <Route path="/marketingManager/faculty" element={<FacultyManager/>}/>
          <Route path="/marketingManager/faculty/:id" element={<FacultyDetailManager/>}/>
          <Route path="/marketingManager/event/:id" element={<EventDetailManager/>}/>
          <Route path="/marketingManager/contribution/:id" element={<ContributionDetailManager/>}/>
          {/* Marketing Coordinator */}
          <Route path="/marketingCoordinator" element={<MarketingCoordinatorPage/>}/>
          {/* Admin Route */}
          <Route path="/admin/faculty" element={<Faculty />} />
          <Route path="/admin/faculty/:id" element={<FacultyDetail />} />
          <Route path="/admin/faculty/add" element={<AddFaculty />} />
          <Route path="/admin/faculty/:id/edit" element={<EditFaculty />} />
          <Route path="/admin/event" element={<Event />} />
          <Route path="/admin/event/:id" element={<EventDetail />} />
          <Route path="/admin/event/add" element={<AddEvent />} />
          <Route path="/admin/event/:id/edit" element={<EditEvent />} />
          <Route path="/admin/contribution" element={<Contribution />} />
          <Route
            path="/admin/contribution/:id"
            element={<ContributionDetail />}
          />
          <Route path="/admin/user/" element={<User />} />
          <Route path="/admin/user/:userId" element={<UserDetail />} />
          <Route path="/admin/user/:userId/edit" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
