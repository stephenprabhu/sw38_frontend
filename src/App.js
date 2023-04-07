import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { Routes, Route } from "react-router-dom";
import Deposit from './pages/Deposit/Deposit';
import AddAccount from './pages/User/AddAccount';
import Withdraw from './pages/withdraw/Withdraw';
import { useContext, useEffect, useState } from 'react';
import UserContext from './helpers/Context/user-context';
import Profile from './pages/User/Profile';
import { Navigate } from 'react-router-dom';
import Transection from './pages/Transection/Transection';
import Promotions from './pages/Promotions/Promotions';
import NotFound from './pages/notFound/NotFound';
import AgencyRegister from './pages/agencyRegister/AgencyRegister';
import Download from './components/Download';
import BottomMenu from './components/BottomMenu';
import Instruction from './pages/Android/Android';
import IOS from './pages/IOS/IOS';
import GameLinks from './pages/GameLinks/LinksPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import SingleTransaction from './pages/Transection/SingleTransaction';

let timeOut = null

function App() {
  const ctx = useContext(UserContext);
  const [downloadButtons, setDownloadButtons] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      ctx.setUser(localStorage.getItem('auth_token'));
    }
  }, []);

  useEffect(() => {
    if (ctx.user) {
      setTimeout(() => {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('loginRequest')
        ctx.setUser(null);
      }, 600000);
    } else {
      clearTimeout(timeOut)
    }
  }, [ctx.user])

  const AuthRoute = ({ children }) => {
    if (!localStorage.getItem('auth_token')) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  const GuestRoute = ({ children }) => {
    if (localStorage.getItem('auth_token')) {
      return <Navigate to="/profile" replace />;
    }
    return children;
  }

  return (
    <div className="App">
      <div>
        {downloadButtons && <Download setDownloadButtons={setDownloadButtons} />}
      </div>
      <div style={{ flexGrow: 1, flexBasis: 0, overflow: 'hidden' }}>
        <Routes>
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
          <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/agent/register" element={<AgencyRegister />} />
          <Route path="/deposit" element={<AuthRoute><Deposit /></AuthRoute>} />
          <Route path="/withdraw" element={<AuthRoute ><Withdraw /></AuthRoute>} />
          <Route path="/profile" element={<AuthRoute><Profile /></AuthRoute>} />
          <Route path="/add-account" element={<AuthRoute ><AddAccount /></AuthRoute>} />
          <Route path="/add-account/:id" element={<AuthRoute ><AddAccount /></AuthRoute>} />
          <Route path="/transections" element={<AuthRoute ><Transection /></AuthRoute>} />
          <Route path="/transections/:id" element={<AuthRoute ><SingleTransaction /></AuthRoute>} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/" element={<Home />} />
          <Route path="/game-links" element={<GameLinks />} />
          <Route path="/android" element={<Instruction />} />
          <Route path="/ios-download" element={<IOS />} />
          <Route path="*" element={<NotFound />} />
        </Routes >
      </div>
      <BottomMenu />
    </div>
  );
}

export default App;
