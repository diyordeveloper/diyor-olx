import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth, db, storage } from "../../../firebase.config";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import "./profil.scss";
import { toast } from "react-toastify";
import { useUserContext } from "../../../Contexts/Context";
import { useAuthContext } from "../../../Contexts/AuthContext";
import NavFot from "../../navfot/NavFot";
import FlipCameraIosOutlinedIcon from "@mui/icons-material/FlipCameraIosOutlined";
import { Modal, Spinner } from "react-bootstrap";
import BakroundImg from "../../../assets/backround/bg.jpg";
import SearchIcon from "@mui/icons-material/Search";
import Moment from "react-moment";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import Likes from "../../products/cardOpen/filtered/Likes";
function Profil() {
  const {} = useUserContext();
  const { user, currentUser, logout, uid } = useAuthContext();
  let { name, email } = useParams();
  const {
    onCardItemClick,
    products,
    setSearchCategory,
    searchCategory,
    searchTitle,
    setSearchTitle,
    ClearCategory,
    users,
  } = useUserContext();

  const navigate = useNavigate();
  const [royxat, setRoyxat] = useState(1);
  const filePickerRef = useRef(null);
  const filePickerRef2 = useRef(null);
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const [images, setImages] = useState(null);
  const [images2, setImages2] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [menu, setMenu] = useState(1);

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
      <>
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
      </>
      <Link to={"/"} className="text_dec_none">
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        Orqaga
        {" / "}
        Profil
      </Link>
      <div className="d-flex align-items-center mt-3 ">
        <button
          className={`mar-r btn btn-outline-secondary   ${
            menu === 1 ? "bg-secondary text-white" : ""
          } `}
          onClick={() => setMenu(1)}
        >
          Profil
        </button>
        <button
          className={`mar-r btn btn-outline-secondary   ${
            menu === 2 ? "bg-secondary text-white" : ""
          } `}
          onClick={() => setMenu(2)}
        >
          Sozlamalar
        </button>
      </div>
      <div className={`${menu === 1 ? "" : "d-none"}`}>
        <div className="row">
          <h2 className="text-center">Mening shaxsiy profilim</h2>
          <div className="col-12 mt-2 ">
            <div
              style={{
                background: `url(${user?.avatarbanner || BakroundImg}) `,
              }}
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
        <hr />
        <h2 className="text-center">E'lonlarim</h2>
        <div className="row mt-4">
          <div className="col-3 d-flex flex-column">
            <strong>Sahifamda qidirish</strong>
            <div className="d-flex align-items-center">
              <SearchIcon className={" mt-4"} />{" "}
              <input
                type={"search"}
                onChange={(e) => setSearchTitle(e.target.value)}
                value={searchTitle}
                placeholder={`${
                  products.filter(
                    (ff) => ff.name === name && ff.email === email
                  ).length
                } ta e'lon`}
                className={"form-control mt-4"}
              />
            </div>
            <strong className="mt-3">E’lonlarimni filtrlash</strong>
            <small>
              Biz{" "}
              {
                products.filter((ff) => {
                  if (searchTitle == "" && searchCategory == "") {
                    return ff.name === name && ff.email === email;
                  } else if (
                    ff.sarlavha
                      .toLowerCase()
                      .includes(searchTitle.toLowerCase()) &&
                    ff.category
                      .toLowerCase()
                      .includes(searchCategory.toLowerCase())
                  ) {
                    return ff.name === name && ff.email === email;
                  }
                }).length
              }{" "}
              ta e'lon topdik
            </small>
          </div>
          <div className="col-9">
            <div className="d-flex align-items-center mb-2">
              <div className="mar-r">Ro'yxat ko'rishi:</div>
              <button
                onClick={() => setRoyxat(1)}
                className={`mar-r btn btn-outline-secondary btn-sm ${
                  royxat === 1 ? "bg-secondary text-white" : ""
                } `}
              >
                <GridViewIcon />
              </button>
              <button
                onClick={() => setRoyxat(2)}
                className={`btn  btn-outline-secondary btn-sm ${
                  royxat === 2 ? "bg-secondary text-white" : ""
                } `}
              >
                <ViewListIcon />
              </button>
              <select
                onChange={(e) => setSearchCategory(e.target.value)}
                className="form-control-sm mar-l "
              >
                <option value="">Tanlang...</option>
                <option value="Bolalar dunyosi">Bolalar dunyosi</option>
                <option value="Ko'chmas mulk">Ko'chmas mulk</option>
                <option value="Transport">Transport</option>
                <option value="Ish">Ish</option>
                <option value="Hayvonlar">Hayvonlar</option>
                <option value="Uy va bog'">Uy va bog'</option>
                <option value="Elektr jihozlari">Elektr jihozlari</option>
                <option value="Xizmatlar">Xizmatlar</option>
                <option value="Moda va stil">Moda va stil</option>
                <option value="Xobbi, sport">Xobbi, sport</option>
              </select>
              <button
                disabled={!searchTitle && !searchCategory}
                className="btn btn-danger btn-sm mar-l "
                onClick={ClearCategory}
              >
                Tozalash
              </button>
            </div>
            <div
              className={`row   cardkorinishida ${
                royxat === 1 ? "" : "d-none"
              }`}
            >
              {products
                .filter((ff) => {
                  if (searchTitle == "" && searchCategory == "") {
                    return ff.name === name && ff.email === email;
                  } else if (
                    ff.sarlavha
                      .toLowerCase()
                      .includes(searchTitle.toLowerCase()) &&
                    ff.category
                      .toLowerCase()
                      .includes(searchCategory.toLowerCase())
                  ) {
                    return ff.name === name && ff.email === email;
                  }
                })

                .map((itm, idx) => (
                  <div className="col-3   " key={idx}>
                    <div className="card  ">
                      <div className="photo">
                        <Link
                          onClick={() => onCardItemClick(itm)}
                          to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                        >
                          <img
                            src={itm.url}
                            className={"img-fluid"}
                            alt="Error"
                          />
                        </Link>
                      </div>
                      <div className="context_">
                        <h4 className="sarlavha">
                          <Link
                            onClick={() => onCardItemClick(itm)}
                            to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                          >
                            <strong>{itm.sarlavha.substr(0, 80)}... </strong>
                          </Link>
                        </h4>
                        <small className="small">
                          <LocationOnOutlinedIcon /> {itm.joylashuv}
                        </small>
                        <small className="small">
                          <AccessTimeOutlinedIcon />{" "}
                          <Moment format="D-MMM-YYYY">
                            {itm.timestamp?.toDate()}
                          </Moment>
                          {" - "}
                          <Moment format="hh:mm:ss">
                            {itm.timestamp?.toDate()}
                          </Moment>
                        </small>
                        <div className="d-flex align-items-center justify-content-between">
                          <strong>
                            <AttachMoneyOutlinedIcon />{" "}
                            {itm.narx && <> {itm.narx}</>}
                            <small>
                              {itm.narxDan && (
                                <>
                                  {" "}
                                  {itm.narxDan}
                                  {" - "}
                                </>
                              )}
                              {itm.narxGacha && <> {itm.narxGacha}</>}
                            </small>
                            {"  "} {itm.valyuta}
                            <small>{itm.narxGacha && <> gacha</>}</small>
                          </strong>
                          <Likes itm={itm} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div
              className={`row   rowxatkorinishida   ${
                royxat === 2 ? "" : "d-none"
              } `}
            >
              {products
                .filter((ff) => {
                  if (searchTitle == "" && searchCategory == "") {
                    return ff.name === name && ff.email === email;
                  } else if (
                    ff.sarlavha
                      .toLowerCase()
                      .includes(searchTitle.toLowerCase()) &&
                    ff.category
                      .toLowerCase()
                      .includes(searchCategory.toLowerCase())
                  ) {
                    return ff.name === name && ff.email === email;
                  }
                })
                .map((itm, idx) => (
                  <div className="col-12 mt-2  " key={idx}>
                    <div className="card   ">
                      <div className="row">
                        <div className="col-3">
                          <div className="photo">
                            <Link
                              onClick={() => onCardItemClick(itm)}
                              to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                            >
                              <img
                                src={itm.url}
                                className={"img-fluid"}
                                alt="Error"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="col-8">
                          <div className="context_">
                            <h4 className="sarlavha">
                              <Link
                                onClick={() => onCardItemClick(itm)}
                                to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                              >
                                <strong>{itm.sarlavha} </strong>
                              </Link>
                            </h4>
                            <small className="small">
                              <LocationOnOutlinedIcon /> {itm.joylashuv}
                            </small>
                            <small className="small">
                              <AccessTimeOutlinedIcon />{" "}
                              <Moment format="D-MMM-YYYY">
                                {itm.timestamp?.toDate()}
                              </Moment>
                              {" - "}
                              <Moment format="hh:mm:ss">
                                {itm.timestamp?.toDate()}
                              </Moment>
                            </small>
                            <div className="d-flex align-items-center justify-content-between">
                              <strong>
                                <AttachMoneyOutlinedIcon />{" "}
                                {itm.narx && <> {itm.narx}</>}
                                <small>
                                  {itm.narxDan && (
                                    <>
                                      {" "}
                                      {itm.narxDan}
                                      {" - "}
                                    </>
                                  )}
                                  {itm.narxGacha && <> {itm.narxGacha}</>}
                                </small>
                                {"  "} {itm.valyuta}
                                <small>{itm.narxGacha && <> gacha</>}</small>
                              </strong>
                              <Likes itm={itm} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`row ${menu === 2 ? "" : "d-none"}`}>
        <h2 className="text-center">Sozlamalar</h2>
      </div>
      {/* <button className="btn btn-danger mt-5" onClick={logout}>
              LogOut
            </button> */}
    </NavFot>
  );
}

export default Profil;
