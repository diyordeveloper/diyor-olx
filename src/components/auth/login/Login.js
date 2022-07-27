import React, { useState } from "react";
 
import { auth } from "../../../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Alert } from "@mui/material";
import { toast } from "react-toastify";
import "./login.scss";
function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setLoader(true);
    const loginemail = e.target[0].value;
    const loginpassword = e.target[1].value;
    try {
      if (loginemail !== "" && loginpassword !== "") {
        const user = await auth
          .signInWithEmailAndPassword(loginemail, loginpassword)
        setLoader(false);
        navigate("/");
        toast.success("You have entered successfully !");
        console.log(user);
        if(user){
          window.location.reload(true);
        }
      } else {
        toast.error("Fill in the field");
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
      setError(err.message);
      console.log(err.message);
    }
  };


  return (
    <div className="row mt-5">
      <div className="col-6 offset-3">
        <Link to="/">
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <h3 className="text-center">Login</h3>
        {error && <Alert severity="error">{error}</Alert>}
         
        <form id={"login"} onSubmit={login}>
          <input
            type="email"
            className="form-control mt-3"
            placeholder={"Email"}
          />
          <input
            type="password"
            className="form-control mt-3"
            placeholder={"Password"}
          />
          <button className="btn btn-primary mt-4" form={"login"}>
            {loader ? "Uploading..." : "Login"}
          </button>
        </form>
        <p className="mt-4">
          If you are not <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
