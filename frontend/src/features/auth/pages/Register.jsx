import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
const Register = () => {
  const { user, loading, handleRegister } = useAuth();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(username, email, password);
    console.log(user);
  };
  if (loading) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <div className="container">
        <h1> Register</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            onInput={(e) => {
              setusername(e.target.value);
            }}
            type="text"
            placeholder="Enter username"
            id="username"
            name="username"
          />
          <input
            onInput={(e) => {
              setemail(e.target.value);
            }}
            type="text"
            placeholder="Enter email"
            id="email"
            name="email"
          />
          <input
            onInput={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            placeholder="Enter password"
            id="password"
            name="password"
          />
          <button className="button primary-button"> Submit </button>
        </form>
        <p>
          {" "}
          Allready have an account? <Link to="/login"> Login </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
