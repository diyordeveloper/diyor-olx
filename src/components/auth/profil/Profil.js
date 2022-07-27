import React, { useEffect, useState, useRef } from "react";
// import { signOut, updateProfile } from "firebase/auth";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth,   storage } from "../../../firebase.config";

import "./profil.scss";
import { toast } from "react-toastify";
import { useUserContext } from "../../../Contexts/Context";
import { useAuthContext } from "../../../Contexts/AuthContext";

function Profil() {
  const {  } = useUserContext();
  const { user,currentUser,logout } = useAuthContext();

  const navigate = useNavigate();
  const filePickerRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [selectFile, setSelectedFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
   
  return (
    <div className="row mt-5 ">
       
      <div className="col-6 offset-3">
        <div className="profil_">
          <Link to="/">
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <h2 className="text-center">Profil</h2>
          <div className=" photos mt-3 ">
            <input
              type="file"
              hidden
              ref={filePickerRef}
              // onChange={UploadPhoto}
            />
            {/* <img src={photoURL} alt="Avatar" /> */}
          </div>
          <button
            className="update_photo mt-3"
            onClick={() => filePickerRef.current.click()}
          >
            <AddAPhotoIcon className="icon_" />
          </button>
          <div className="mt-3">
            <h3>
              <AccountCircleIcon /> : {user?.name}
            </h3>
            <h3>
              <EmailIcon /> : {user?.email}
            </h3>
            <h3>
              <EmailIcon /> : {user?.phone}
            </h3>
          </div>
          <button className="btn btn-danger mt-5" onClick={logout}>
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profil;
