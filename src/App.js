import './App.css';
import Content from './components/Content';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './components/loginsignup/Login';
import Signup from './components/loginsignup/Signup';
// import { AuthProvider, AuthContext } from "./components/loginsignup/AuthProvider";
import React from 'react';
import ForgotPassword from './components/loginsignup/ForgotPassword';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { AuthProvider } from './components/loginsignup/AuthProvider';
import Dashboard from "./components/loginsignup/Dashboard";
import ProtectedRoute from "./components/loginsignup/ProtectedRoute";


function App() {
  return(
    <>
    {/* <Navbar title = "AnnaConnect"/>
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
    <Content/>
    <Footer/> */}

<BrowserRouter>
<AuthProvider>
<Routes >
          <Route path='/' exact element={<> <Navbar title = "AnnaConnect" /> <Content/> <Footer/> </>} />
          <Route path="/signup" element={<><Navbar title = "AnnaConnect" /> <Signup /> </>} />
          <Route path="/login" element={<><Navbar title = "AnnaConnect"/> <Login /> </>} />
          <Route path="/ForgotPassword" element={<><Navbar title = "AnnaConnect"/> <ForgotPassword /> </>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar title = "AnnaConnect" />
                <Dashboard />
                <Content/> <Footer/>
              </ProtectedRoute>
            }
          />
      </Routes>
</AuthProvider>
      </BrowserRouter>
    </>
  );
};
// const PrivateRoute = ({ children }) => {
//   const { currentUser } = React.useContext(AuthContext);

//   return currentUser ? children : <Navigate to="/Navbar" />;
// };

export default App;