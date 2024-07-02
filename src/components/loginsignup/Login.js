import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth ,googleProvider } from "./firebase";
import { signInWithEmailAndPassword ,signInWithPopup} from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("login successful!");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google login successful!");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      {error && <p>{error}</p>}
      <p>
         Don't have an account? 
        <button onClick={() => navigate('/Signup')}>Sign Up</button>
      </p>
      <p>
        <button onClick={() => navigate('/ForgotPassword')}>Forgot Password?</button>
      </p>
    </div>
  );
};

export default Login;
