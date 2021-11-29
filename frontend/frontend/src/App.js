import './App.css';
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import FindPage from './components/FindPage'
import UpdateAccount from './components/UpdateAccount'
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="find" element={<FindPage />} />
      <Route path="updateaccount" element={<UpdateAccount />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
