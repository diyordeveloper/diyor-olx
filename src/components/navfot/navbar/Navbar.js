import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../Contexts/Context";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useAuthContext } from "../../../Contexts/AuthContext";
import { db } from "../../../firebase.config";
import "./navbar.scss";
function Navbar() {
  const navigate = useNavigate();
  const {ClearCategory} = useUserContext();
  const { user, currentUser, logout, uid } = useAuthContext();
  function OnBtn() {
    if (uid !== null) {
      navigate("/elon");
    } else {
      navigate("/register");
    }
  }
  const [likesLen, setLikesLen] = useState([]);
  const getLikesLen = async () => {
    const likesLen = await db
      .collection("Likes" + " " + user?.name + " " + uid)
      .get();
    const likesLenArray = [];
    for (var snap of likesLen.docs) {
      var data = snap.data();
      data.ID = snap.id;
      likesLenArray.unshift({
        ...data,
      });
      if (likesLenArray.length === likesLen.docs.length) {
        setLikesLen(likesLenArray);
      }
    }
  };
  useEffect(() => {
    getLikesLen();
  });
  return (
    <nav className="navbar border-bottom  navbar-light bg-light justify-content-between mar-l mar-r ">
      <Link to="/" className="navbar-brand" onClick={ClearCategory}>
        <h2 className="logo_">DiyorOLX</h2>
      </Link>
      <div className="d-flex justify-content-between align-items-center">
        <Link
          to={`${uid !== null ? "/comment" : "/register"}`}
          className="text_dec_none     mar-r
             "
        >
          <strong>Xabarlar </strong>
          <ChatBubbleIcon className="icon_" />
        </Link>
        <Link
          to={`${uid !== null ? "/favorites" : "/register"}`}
          className="text_dec_none Likes   mar-r "
        >
          <strong>Saralangan </strong>
          <FavoriteIcon className="icon_likes" />
          {likesLen.length !== 0 ? (
            <div className="likeslen">{likesLen.length}</div>
          ) : null}
        </Link>
        {currentUser ? (
          <UncontrolledDropdown className="mar-r">
            <DropdownToggle caret>
              <strong>Profilim </strong>
              <PersonIcon className="icon_" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <strong>{user?.name.substr(0, 12)}...</strong>
              </DropdownItem>
              <DropdownItem>
                <Link
                  className="btn btn-primary"
                  to={`${uid !== null ? "/profil" : "/register"}`}
                >
                  <PersonIcon className="icon_" /> Profilim
                </Link>{" "}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <a href="#" className="btn btn-danger" onClick={logout}>
                  <LogoutIcon /> LogOut
                </a>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ) : (
          <Link
            to={`${uid !== null ? `/profil/${user?.name}` : "/register"}`}
            className="text_dec_none  mar-r"
          >
            <strong>Profilim </strong>
            <PersonIcon className="icon_" />
          </Link>
        )}
        <button onClick={OnBtn} className="btn btn-success ">
          + Elon berish
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
