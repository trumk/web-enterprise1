import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import { Homepage } from './pages/Homepage';
import { VerifyAccount } from './pages/VerifyAccount';

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path='/verify-account' element={<VerifyAccount/>}/>
          </Routes>
        </BrowserRouter>
    
  );
}

export default App;