import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Content from './components/Content';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './components/loginsignup/Login';
import Signup from './components/loginsignup/signup';
import { AuthProvider, AuthContext } from "./components/loginsignup/AuthProvider";
import React from 'react';
import ForgotPassword from './components/loginsignup/ForgotPassword';




function App() {
  return(
    <>
    <Navbar title = "AnnaConnect"/>
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
    <Content/>
    <Footer/>
    </>
  );
};
const PrivateRoute = ({ children }) => {
  const { currentUser } = React.useContext(AuthContext);

  return currentUser ? children : <Navigate to="/login" />;
};

  const Home = () => {
    return <h2>Home</h2>;
  };

export default App;
