import React, { useEffect, useState, useRef } from "react"; 
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
import NavFot from "../../navfot/NavFot";
import FlipCameraIosOutlinedIcon from "@mui/icons-material/FlipCameraIosOutlined";
import { Modal, Spinner } from "react-bootstrap";
import BakroundImg from "../../../assets/backround/bg.jpg";
function Profil() {
  const {} = useUserContext();
  const { user, currentUser, logout, uid } = useAuthContext();

  const navigate = useNavigate();
  const filePickerRef = useRef(null);
  const filePickerRef2 = useRef(null);
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const [images, setImages] = useState(null);
  const [images2, setImages2] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
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
    setShow(!show);
  };
  const handleChangeImagess2 = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImages2(selectedFile);
      } else {
        setImages2(null);
      }
    } else {
      console.log("please select your file");
    }
    setShow2(!show2);
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
                  setInterval(() => {
                    setShow(!show);
                    window.location.reload(true);
                  }, 1000);
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
  const UploadImg2 = (e) => {
    setLoader(true);
    const promises = [];
    if (images2 !== null) {
      const uploadTask = storage
        .ref(
          `users/${user?.name + " - " + user?.phone + " - " + user?.uid}/${
            images2.name
          }`
        )
        .put(images2);
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
            .child(images2.name)
            .getDownloadURL()
            .then((ImageUrl) => {
              // All
              db.collection("users")
                .doc(uid)
                .update({
                  avatarbanner: ImageUrl,
                })
                .then((res) => {
                  console.log(res);
                  toast.success("Muvaffaqqiyatli qo'shildi !");
                  setInterval(() => {
                    setShow2(!show2);
                    window.location.reload(true);
                  }, 1000);
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
    <NavFot>
      <Modal size="sm" show={show} onHide={!show}>
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-center">
            <button className="btn btn-success  " onClick={UploadImg}>
              {loader ? <Spinner animation="border" size="sm" /> : "Yuklash"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal size="sm" show={show2} onHide={!show2}>
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-center">
            <button className="btn btn-success  " onClick={UploadImg2}>
              {loader ? <Spinner animation="border" size="sm" /> : "Yuklash"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="row   ">
        <div>
        <Link to={"/"} className="text_dec_none">
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          Orqaga
          {" / "}
          Profil
        </Link>
        </div>
        <div className="col-12  ">
          <div
            style={{ background: `url(${user?.avatarbanner || BakroundImg}) ` }}
            className="profils_ card  pt-5 pb-5"
          >
            <div className="photo">
              <img
                src={
                  user?.avatarimg ||
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
                alt="Error!!"
              />
              <div
                className="icons"
                onClick={() => filePickerRef.current.click()}
              >
                <FlipCameraIosOutlinedIcon className="icon_" />
                <input
                  type="file"
                  id="file"
                  hidden
                  ref={filePickerRef}
                  className="form-control"
                  onChange={handleChangeImagess}
                />
              </div>
            </div>
            <div
              className="profil_banner"
              onClick={() => filePickerRef2.current.click()}
            >
              <FlipCameraIosOutlinedIcon className="icon_" />
              <input
                type="file"
                id="file"
                hidden
                ref={filePickerRef2}
                className="form-control"
                onChange={handleChangeImagess2}
              />
            </div>
            <h3 className="username text-white">{user?.name}</h3>
            <h5 className="  text-white">{user?.email}</h5>
            <h5>
              <a
                href={`tel:${user?.phone}`}
                className=" text_dec_none  text-white"
              >
                +{user?.phone}
              </a>
            </h5>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-4">
          <h5>E’lonlarni filtrlash</h5>
          <input type={"search"} className={"form-control"}   />
        </div>
          <div className="col-8">

          </div>
      </div>
      {/* <button className="btn btn-danger mt-5" onClick={logout}>
              LogOut
            </button> */}
    </NavFot>
  );
}

export default Profil;
