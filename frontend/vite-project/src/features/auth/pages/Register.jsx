import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/form.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  

    e.preventDefault();
    // axios
    //   .post("http://localhost:3000/api/auth/register", formData,{withCredentials:true})
      
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });

    

    console.log("Register Data:", formData);
  };

  return (
    <div className="register">
      <div className="register__card">
        <h2 className="register__title">Create Account</h2>

        <form onSubmit={handleSubmit} className="register__form">
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

         

          <button type="submit">Register</button>
        </form>
        <p>
          {" "}
          Already have an account?{" "}
          <Link className="toggleAuthForm" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
