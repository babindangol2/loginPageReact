import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons
import "./Login.css";

// Mock user data
const mockUsers = [
  { username: "user1", password: "password1", name: "User One" },
  { username: "user2", password: "password2", name: "User Two" },
  { username: "admin", password: "admin123", name: "Administrator" },
];

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Track password visibility

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Both fields are required!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        toast.success(`Welcome, ${user.name}!`, {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/dashboard", { state: { name: user.name } });
        }, 500); // Navigate after 3 seconds
      } else {
        toast.error(`Invalid username or password!`, {
          position: "top-right",
          autoClose: 3000,
        });
        // setErrorMessage("Invalid username or password!");
      }

      setLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState); // Toggle visibility
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
