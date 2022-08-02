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
   
   

  useEffect(() => {
    alanBtn({
      key: "8c0e5f03ccb3a0add16b728e3cf15f432e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "OpenProfil") {
          navigate(`/profilim/${user?.name}/${user?.email}`);
        }
        if (commandData.command === "OpenFavorites") {
          navigate(`/favorites`); 
        }
        if (commandData.command === "ElonAdd") {
          navigate(`/elon`); 
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
          toast.warning("Diyor OLX ga kirish");
        }
        if (commandData.command === "LogOut") {
          logout();
        }
        if (commandData.command === "Reload") {
          ReloadPage();
        }
        if (commandData.command === "OpenDocument") {
          navigate("/yoriqnoma");
        }
        // Audio
      },
    });
  }, []);

  return <></>;
}

export default Alanai;
