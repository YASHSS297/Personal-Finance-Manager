import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const API_URL = "http://localhost:5000"; 

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Toggle between Login & Signup
  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
    setError("");
  };

  // Signup API Call
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/register`, { fullName, email, password });
      alert("Signup successful! Please login.");
      setIsSignUp(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed!");
    }
  };

  // Login API Call
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className={`container ${isSignUp ? "active" : ""}`} id="container">
      <div className="form-container" id={isSignUp ? "signUpForm" : "signInForm"}>
        <h1>Personal Finance Manager</h1>
        <h3>{isSignUp ? "Create Account" : "Login"}</h3>
        {error && <p className="error-message">{error}</p>}

        {isSignUp && (
          <input 
            type="text" 
            placeholder="Full Name" 
            className="input-field" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
          />
        )}
        
        <input 
          type="email" 
          placeholder="Email" 
          className="input-field" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        <input 
          type="password" 
          placeholder="Password" 
          className="input-field" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        {isSignUp ? (
          <button className="btn" onClick={handleSignUp}>Sign Up</button>
        ) : (
          <button className="btn" onClick={handleSignIn}>Sign In</button>
        )}
        
        <p onClick={handleToggle} className="toggle-text">
          {isSignUp ? "Already have an account? Sign In" : "New user? Sign Up"}
        </p>
      </div>

      <div className="toggle-container">
        <div className="toggle-content">
          <h2>{isSignUp ? "Welcome Back!" : "Hello, Friend!"}</h2>
          <p>{isSignUp 
            ? "To keep connected with us please login with your personal info" 
            : "Enter your personal details and start journey with us"}
          </p>
          <button className="toggle-btn" onClick={handleToggle}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
