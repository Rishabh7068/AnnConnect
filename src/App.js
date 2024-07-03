import "./App.css";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./components/loginsignup/Login";
import Signup from "./components/loginsignup/Signup";
// import { AuthProvider, AuthContext } from "./components/loginsignup/AuthProvider";
import React from "react";
import ForgotPassword from "./components/loginsignup/ForgotPassword";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { AuthProvider } from "./components/loginsignup/AuthProvider";
import Registration from "./components/loginsignup/Registration";
import ProtectedRoute from "./components/loginsignup/ProtectedRoute";
import Rerite from "./components/loginsignup/Rerite";
import Submission from "./components/loginsignup/Submission";


function App() {
  return (
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
          <Routes>
            {/* <Route path="/signup" element={<><Navbar title = "AnnaConnect" /> <Signup /> </>} />
          <Route path="/login" element={<><Navbar title = "AnnaConnect"/> <Login /> </>} /> */}
            {/* <Route path="/ForgotPassword" element={<><Navbar title = "AnnaConnect"/> <ForgotPassword /> </>} /> */}

            <Route
              path="/"
              exact
              element={
                <>
                  {" "}
                  <Navbar title="AnnaConnect" /> <Content /> <Footer />{" "}
                </>
              }
            />
            <Route
              path="/ForgotPassword"
              element={
                <Rerite>
                  <Navbar title="AnnaConnect" /> <ForgotPassword />
                </Rerite>
              }
            />
            <Route
              path="/signup"
              element={
                <Rerite>
                  <Navbar title="AnnaConnect" /> <Signup />
                </Rerite>
              }
            />
            <Route
              path="/login"
              element={
                <Rerite>
                  <Navbar title="AnnaConnect" /> <Login />{" "}
                </Rerite>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {" "}
                  <Navbar title="AnnaConnect" />
                  <Submission/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
