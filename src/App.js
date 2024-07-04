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
import Donor from "./components/loginsignup/Donor";
import Ngo from "./components/loginsignup/Ngo";


function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <>
                  <Navbar title="AnnaConnect" /> <Content /> <Footer />
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
                  <Navbar title="AnnaConnect" /> <Login />
                </Rerite>
              }
            />
            <Route
              path="/Registration"
              element={
                <ProtectedRoute>
                  <div>
                  <Navbar title="AnnaConnect" />
                  </div>
                  <div>
                    <Registration/>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/Donor"
              element={
                <ProtectedRoute>
                  <div>
                  <Navbar title="AnnaConnect" />
                  </div>
                  <div>
                    <Donor/>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/Ngo"
              element={
                <ProtectedRoute>
                  <div>
                  <Navbar title="AnnaConnect" />
                  </div>
                  <div>
                    <Ngo/>
                  </div>
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
