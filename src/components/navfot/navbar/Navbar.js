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
import "./navbar.scss";
import { useAuthContext } from "../../../Contexts/AuthContext";
function Navbar() {
  const navigate = useNavigate();

  const {} = useUserContext();
  const { user, currentUser, logout, uid } = useAuthContext();

  return (
    <nav className="navbar border-bottom  navbar-light bg-light justify-content-between mar-l mar-r ">
      <Link to="/" className="navbar-brand">
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
          to={`${uid !== null ? "/sorted" : "/register"}`}
          className="text_dec_none  mar-r "
        >
          <strong>Saralangan </strong>
          <FavoriteIcon className="icon_" />
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
                  className="text-dark text_dec_none"
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
            to={`${uid !== null ? "/profil" : "/register"}`}
            className="text_dec_none  mar-r"
          >
            <strong>Profilim </strong>
            <PersonIcon className="icon_" />
          </Link>
        )}
        <Link
          to={`${uid !== null ? "/elon" : "/register"}`}
          className="btn btn-success "
        >
          + Elon berish
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
