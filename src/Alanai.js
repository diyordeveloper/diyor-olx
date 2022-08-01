import React, { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import { useNavigate } from "react-router-dom";
import { useUserContext } from "./Contexts/Context";
import { useAuthContext } from "./Contexts/AuthContext";
import { toast } from "react-toastify";
function Alanai() {
  const navigate = useNavigate();
  const {
    ClearCategory, 
    ToggleModalopen,
    ToggleModalClose, 
    Audio1ToggleOn,
Audio1ToggleOff, 
  } = useUserContext();
  const { user, currentUser, logout, uid } = useAuthContext();
  function ReloadPage() {
    window.location.reload();
  }
  function Profilim() {
    if (uid !== null) {
      navigate(`/profilim/${user?.name}/${user?.email}`);
    } else {
      navigate("/register");
      toast.warning("Ro'yxatdan o'tmagansiz");
    }
  }
  function Favorites() {
    if (uid !== null) {
      navigate(`/favorites`);
    } else {
      navigate("/register");
      toast.warning("Ro'yxatdan o'tmagansiz");
    }
  }

  useEffect(() => {
    alanBtn({
      key: "8c0e5f03ccb3a0add16b728e3cf15f432e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "OpenProfil") {
          Profilim();
        }
        if (commandData.command === "OpenFavorites") {
          Favorites();
        }
        if (commandData.command === "GoBackHomePage") {
          navigate(`/`);
        }
        if (commandData.command === "Register") {
          navigate("/register");
          toast.warning("Ro'yxatdan o'tish");
        }
        if (commandData.command === "LogIn") {
          navigate("/login");
          toast.warning("DiyorOLX ga kirish");
        }
        if (commandData.command === "LogOut") {
          logout();
        }
        if (commandData.command === "Reload") {
          ReloadPage();
        }
        if (commandData.command === "OpenModal") {
          ToggleModalopen();
        }
        if (commandData.command === "CloseModal") {
          ToggleModalClose();
        }
        // Audio
        if (commandData.command === "Audio1On") {
          Audio1ToggleOn();
        }
        if (commandData.command === "Audio1Off") {
          Audio1ToggleOff();
        }
      },
    });
  }, []);

  return <></>;
}

export default Alanai;
