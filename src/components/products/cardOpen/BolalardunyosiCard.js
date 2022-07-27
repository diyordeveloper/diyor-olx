import React, { useState } from "react";
import { useUserContext } from "../../../Contexts/Context"; 
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import firebase from "firebase";
import Moment from "react-moment";
import "./styleCard.scss";
import { toast } from "react-toastify";
import { db } from "../../../firebase.config"; 
import { useAuthContext } from "../../../Contexts/AuthContext";
import Comment from "./filtered/Comment";
function BolalardunyosiCard({ id, category }) {
  const { products, cardItemCategory,cardItemID } = useUserContext(); 
  const { user,  uid } = useAuthContext();
 
  return (
    <>
      <div className={"d-flex align-items-center "}>
        <Link to={"/"} className="text_dec_none">
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          Orqaga
          {" / "}
          {category}
        </Link>
      </div>

      {category === cardItemCategory
        ? products
            .filter((f) => f.id === id)
            .map((itm, idx) => (
              <>
                <div className="col-12 cardopen" key={idx}>
                  <div className="row">
                    <div className="col-7 ">
                      <div className="photo  ">
                        <img
                          src={itm.url}
                          className="img-fluid"
                          alt="Error!!!"
                        />
                      </div>
                      <div className="context_">
                        <div className="d-flex align-items-center justify-content-between ">
                          <small className="small">
                            <AccessTimeOutlinedIcon /> Joylashtirildi {" - "}
                            <Moment format="D-MMM-YYYY">
                              {itm.timestamp?.toDate()}
                            </Moment>
                            {" - "}
                            <Moment format="hh:mm:ss">
                              {itm.timestamp?.toDate()}
                            </Moment>
                          </small>
                          <IconButton>
                            <FavoriteBorderIcon className="like_icon" />
                          </IconButton>
                        </div>
                        <h3 className="mt-2">{itm.sarlavha}</h3>
                        <h3 className="mt-2">
                          <strong>
                            {itm.narx}
                            {"  "} so'm
                          </strong>
                        </h3>
                        <div className="mt-4">
                          <button className="btn btn-outline-secondary mar-r  ">
                            {itm.xususiyyokibiznes}
                          </button>
                          <button className="btn btn-outline-secondary mar-r">
                            {itm.holati}
                          </button>
                        </div>
                        <h3 className="mt-3"> Tavsif</h3>
                        <p className="mt-2">{itm.tavsif}</p>
                        <hr />
                        <div className="d-flex align-items-center justify-content-between ">
                          <small>ID:{" "}{id}</small>
                        </div>
                      </div>
                      <Comment itm={itm}   />
                    </div>
                    <div className="col-5">
                      <div className="user">
                        <h5>Foydalanuvchi</h5>
                        <div className="row">
                          <div className="col-2">
                            <div className="avatarka">
                              <img
                                src={
                                  itm.avatarimg ||
                                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                                }
                                className={"img-fluid"}
                                alt="Error"
                              />
                              <strong></strong>
                            </div>
                          </div>
                          <div className="col-10">
                            <h4>{itm.name}</h4>
                            <h5>
                              <a
                                href={`email:${itm.email}`}
                                className={"text_dec_none"}
                              >
                                {itm.email}
                              </a>
                            </h5>

                            <small>OLXda <Moment format="D-MMM-YYYY">
                          {itm.timestamp?.toDate()}
                        </Moment>
                        {" - "}
                        <Moment format="hh:mm:ss">
                          {itm.timestamp?.toDate()}
                        </Moment> beri</small>
                            <div>
                              <a
                                href={`tel:${itm.tel}`}
                                className="btn mt-2 btn-outline-success"
                              >
                                <PhoneForwardedIcon /> Qo'ng'iroq qilish{" "} {"+"+itm.phone}
                              </a>
                            </div>
                            <br />
                            <Link
                              className=" mt-4 text_dec_none text-secondary      "
                              to={""}
                            >
                              Muallifning boshqa e'lonlari <ArrowForwardIcon />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="joylashuv mt-3">
                        <h5>Joylashuv</h5> 
                            <h5>
                              <LocationOnOutlinedIcon /> {itm.joylashuv}
                            </h5>  
                      </div>
                      <div className="reklama mt-3">
                        <h5>Bu yerda reklama banner turadi !</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
        : null}
    </>
  );
}

export default BolalardunyosiCard;
