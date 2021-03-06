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
import SearchHistory from './components/SearchHistory';

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />    {/* the login form */}
      <Route path="find" element={<FindPage />} />  {/* displayed restaurant info + input form */ }
      <Route path="updateaccount" element={<UpdateAccount />} />
      <Route path="history" element={<SearchHistory />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;