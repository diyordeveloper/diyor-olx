import React, { useEffect, useState, useRef } from "react";
// import { signOut, updateProfile } from "firebase/auth";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth, db, storage } from "../../../firebase.config";

import "./profil.scss";
import { toast } from "react-toastify";
import { useUserContext } from "../../../Contexts/Context";
import { useAuthContext } from "../../../Contexts/AuthContext";

function Profil() {
  const {} = useUserContext();
  const { user, currentUser, logout, uid } = useAuthContext();

  const navigate = useNavigate();
  const filePickerRef = useRef(null);
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const [images, setImages] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loader, setLoader] = useState(false);
  const handleChangeImagess = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImages(selectedFile);
      } else {
        setImages(null);
      }
    } else {
      console.log("please select your file");
    }
  };

  const UploadImg = (e) => {

    setLoader(true);
    const promises = [];
    if (images !== null) {
      const uploadTask = storage
        .ref(
          `users/${user?.name + " - " + user?.phone + " - " + user?.uid}/${
            images.name
          }`
        )
        .put(images);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref(
              `users/${user?.name + " - " + user?.phone + " - " + user?.uid}`
            )
            .child(images.name)
            .getDownloadURL()
            .then((ImageUrl) => {
              // All
              db.collection("users")
                .doc(uid)
                .update({
                  avatarimg: ImageUrl,
                })
                .then((res) => {
                  console.log(res);
                  toast.success("Muvaffaqqiyatli qo'shildi !"); 
                    window.location.reload(true);

                })
                .catch((err) => {
                  console.log(err.message);
                });
                // 
                 
              setLoader(false);
            });
        }
      );
    } else {
      toast.error("Rasmni tanlang !");
      setLoader(false);

    }
  };
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
              id="file"
              className="form-control"
              onChange={handleChangeImagess}
            />
            <button className="btn btn-success" onClick={UploadImg}>
              {loader ? "Yuklanmoqda..." : "Yuklash"}
            </button>
          </div>

          <div className="mt-3">
            <img src={user?.avatarimg} alt="Errorr!" />
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
