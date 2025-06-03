import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";

const allowedUsers = {
 siri : "12345",
 divya : "12345"
};

const sheetDBBaseURL = "https://sheetdb.io/api/v1/rcg7cg5ha55ti"; // replace with your SheetDB ID

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    // Check if username and password match allowed users
    if (!allowedUsers[username] || allowedUsers[username] !== password) {
      alert("Invalid username or password");
      return;
    }

    try {
      // Check if user has already submitted in SheetDB
      const response = await axios.get(`${sheetDBBaseURL}/search?username=${username}`);

      if (response.data && response.data.length > 0) {
        alert("You have already submitted the test and cannot log in again.");
       // window.location.href = "/access-blocked";
        return;
      }

      // If not submitted yet, proceed
      onLogin(username);

      if (rememberMe) {
        localStorage.setItem("rememberedUser", username);
      } else {
        localStorage.removeItem("rememberedUser");
      }

    } catch (error) {
      console.error("Error checking submission:", error);
      alert("An error occurred while checking your submission. Try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-header">Listening Assessment</h1>
        <p className="login-subtext">Please log in to access your test</p>

        <label htmlFor="username" className="login-label">Username</label>
        <input
          id="username"
          type="text"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          autoComplete="off"
        />

        <label htmlFor="password" className="login-label">Password</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <div className="login-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
