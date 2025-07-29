import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    if (!password||!email||!confirmPassword) {
      setError('Please fill all fields')
      return
    }
    const formData = new FormData();
    formData.append("password", password);
    formData.append("email", email);
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(`${SERVER_URL}/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { success, message } = response.data;
      if (success) {
        navigate("/login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data.message ||
        "Something went wrong. Please try again.";
      setError(errorMessage);
    }
  };
  return (
    <>
      <div className="loginForm-Container">
        <div className="loginForm-box">
          <form action="" onSubmit={handleSubmit}>
            <div className="text-center">
              <h2 className="loginForm-header">Create Account</h2>
            </div>
            {error&&
            <div className="alert alert-danger m-0 p-2 mb-1" role="alert">
              {error}
            </div>
            }
            
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="loginForm-input w-100 "
                name=""
                id=""
                placeholder="Email "
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="loginForm-input w-100"
                placeholder="Password"
              />
            </div>
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="loginForm-input w-100"
                placeholder="Confirm Password"
              />
            </div>
            <div>
              <button className="loginForm-Submit w-100">Submit</button>
            </div>
            <p>
              Already have an account?
              <a className="text-primary" onClick={() => navigate("/login")}>
                Login here{" "}
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
