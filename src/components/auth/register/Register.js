import React, { useEffect, useState } from "react";

import { auth, db } from "../../../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Alert } from "@mui/material";
import { toast } from "react-toastify";
import firebase from "firebase";
import "./register.scss";
function Register() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  

  const register = async (e) => {
    e.preventDefault();
    setLoader(true);
    const name = e.target[0].value;
    const phon = e.target[1].value;
    const registeremail = e.target[2].value;
    const registerpassword = e.target[3].value;
    const phone = Number(phon);

    try {
      if (registeremail !== "" && registerpassword !== "") {
        const user = await auth
          .createUserWithEmailAndPassword(registeremail, registerpassword)
          .then((red) => {
            console.log(red);
            db.collection("users").doc(red.user.uid).set({
              uid: red.user.uid,
              name,
              phone,
              email: registeremail,
              password: registerpassword,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          });
        setLoader(false);
        navigate("/");
        toast.success("You have successfully registered !");
        console.log(user);
        if (user) {
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

        <h3 className="text-center">Register</h3>
        {error && <Alert severity="error">{error}</Alert>}

        <form id={"register"} onSubmit={register}>
          <input
            type="text"
            className="form-control mt-3"
            placeholder={"Last Name and First Name"}
          />
          <input
            type="tel"
            className="form-control mt-3"
            placeholder={"Phone"}
          />
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
          <button form={"register"} className="btn btn-success mt-4">
            {loader ? "Uploading..." : "Register"}
          </button>
        </form>

        <p className="mt-4">
          <Link to="/login">Login</Link> if you are registered
        </p>
      </div>
    </div>
  );
}

export default Register;
