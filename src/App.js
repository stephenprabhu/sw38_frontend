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

function App() {
  const ctx = useContext(UserContext);
  const [downloadButtons, setDownloadButtons] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      ctx.setUser(localStorage.getItem('auth_token'));
    }
    localStorage.setItem('downlod', true)
  }, []);

  const AuthRoute = ({ children }) => {
    if (!localStorage.getItem('auth_token')) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  const GuestRoute = ({ children }) => {
    if (localStorage.getItem('auth_token')) {
      return <Navigate to="/member" replace />;
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
          <Route path="/agent/register" element={<AgencyRegister />} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/deposit" element={<AuthRoute><Deposit /></AuthRoute>} />
          <Route path="/withdraw" element={<AuthRoute ><Withdraw /></AuthRoute>} />
          <Route path="/member" element={<AuthRoute><Profile /></AuthRoute>} />
          <Route path="/add-account" element={<AuthRoute ><AddAccount /></AuthRoute>} />
          <Route path="/add-account/:id" element={<AuthRoute ><AddAccount /></AuthRoute>} />
          <Route path="/transections" element={<AuthRoute ><Transection /></AuthRoute>} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes >
      </div>
      <BottomMenu />
    </div>
  );
}

export default App;
