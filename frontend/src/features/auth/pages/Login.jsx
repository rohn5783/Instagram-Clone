import React from "react";
import "../style/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
const Login = () => {
const {user, loading, handleLogin} = useAuth();

const [userName, setuserName] = React.useState("");
const [Password, setPassword] = React.useState("");
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(userName, Password);
    console.log(user);
    navigate("/");
  };

  if (loading) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <div className="container">
        <h1> Login</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <input
          onInput={(e)=> {setuserName(e.target.value)}}
            type="text"
            placeholder="Enter username"
            id="username"
            name="username"
          />
          <input
            onInput={(e)=> {setPassword(e.target.value)}}
            type="password"
            placeholder="Enter password"
            id="password"
            name="password"
          />
          <button className="button primary-button"> Submit </button>
        </form>
        <p>
          {" "}
          Dont have an account? <Link to="/register"> Register </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
