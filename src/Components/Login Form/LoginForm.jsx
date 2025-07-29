import React, { useContext, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import OtpModal from "../OtpBox/OtpModal";
import axios from "axios";
import { UserContext } from "../../Context Api/UserContext";

export default function Loginform() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [otp, setOtp] = useState();

  const {setUser}=useContext(UserContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    const formData = new FormData();
    if (!password||!email) {
      setError('Please fill all fields')
      return
    }    
    formData.append("password", password);
    formData.append("email", email);
    try {
      const response = await axios.post(`${SERVER_URL}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },withCredentials:true
      });
      const { success, message ,data} = response.data;
      if (success) {        
        setUser(data)
        navigate("/");
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
              <h2 className="loginForm-header">Login</h2>
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
                onChange={(e)=>setEmail(e.target.value)}
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
                onChange={(e)=>setPassword(e.target.value)}
                className="loginForm-input w-100"
                placeholder="Password"
              />
            </div>
            <div>
              <button className="loginForm-Submit w-100">Submit</button>
            </div>
            <p>
              Don't have an account?
              <a className="text-primary" onClick={() => navigate("/signup")}>
                Register here{" "}
              </a>
            </p>
          </form>
        </div>
      </div>
      <OtpModal otp={otp} open={open} setOpen={setOpen} setOtp={setOtp} />
    </>
  );
}
