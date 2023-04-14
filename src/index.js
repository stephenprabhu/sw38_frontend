import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContext from './helpers/Context/user-context';
import UserProvider from './helpers/Context/UserProvider';
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));

// console.clear()
// console.log("%cDừng lại!", "color: rgb(187, 29, 29); font-size:x-large")
// console.log("Đây là một tính năng của trình duyệt dành cho các nhà phát triển. Nếu ai đó bảo bạn sap chép - dán nội dung nào đó vào đây để bật một tính năng của Facebook hoặc “hack” tài khoản của người khác, thì đó là hành vi lừa đảo và sẽ khiến họ có thể truy cập vào tài khoản Facebook của bạn.")
// console.log("Xem https://t.me/itech365 để biết thêm thông tin.")

root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
