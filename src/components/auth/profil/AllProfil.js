import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
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
import BakroundImg from "../../../assets/backround/bg.jpg";
function AllProfil() {
  let { name ,email} = useParams();

  const {} = useUserContext(); 
  const navigate = useNavigate(); 
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const users = await db.collection("users").get();
    const usersArray = [];
    for (var snap of users.docs) {
      var data = snap.data();
      data.ID = snap.id;
      usersArray.unshift({
        ...data,
      });
      if (usersArray.length === users.docs.length) {
        setUsers(usersArray);
      }
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <NavFot>
      {
        users
        .filter((ff)=>ff.name === name||ff.email===email)
        .map((itm,idx)=>(
            <div className="row   " key={idx}>
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
            style={{ background: `url(${itm.avatarbanner || BakroundImg}) ` }}
            className="profils_ card  pt-5 pb-5"
          >
            <div className="photo">
              <img
                src={
                    itm.avatarimg ||
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
                alt="Error!!"
              />
            </div>
            <div className="profil_banner"></div>
            <h3 className="username text-white">{itm.name}</h3>
            <h5 className="  text-white">{itm.email}</h5>
            <h5>
              <a href={`tel:${itm.phone}`} className=" text_dec_none  text-white">
                +{itm.phone}
              </a>
            </h5>
          </div>
        </div>
      </div>
        ))
      }
      <div className="row mt-5">
        <div className="col-4">
          <h5>E’lonlarni filtrlash</h5>
          <input type={"search"} className={"form-control"} />
        </div>
        <div className="col-8"></div>
      </div>
    </NavFot>
  );
}

export default AllProfil;
