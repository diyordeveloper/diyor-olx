import React, { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import { useNavigate } from "react-router-dom";
import { useUserContext } from "./Contexts/Context";
import { useAuthContext } from "./Contexts/AuthContext";
function Alanai() {
  const navigate = useNavigate();
  const { ClearCategory, products, } = useUserContext();
  const { user, currentUser, logout, uid } = useAuthContext();
  useEffect(() => {
    alanBtn({
      key: "8c0e5f03ccb3a0add16b728e3cf15f432e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "OpenProfil") {
          navigate(`/profilim/${user?.name}/${user?.email}`);
        }
        if (commandData.command === "OpenFavorites") {
          navigate(`${uid !== null ? "/favorites" : "/register"}`);
        }
        if (commandData.command === "GoBackHomePage") {
            navigate(`/`);
          }
          if (commandData.command === "LogOut") {
            logout()
          }
      },
    });
  }, []);
  return <></>;
}

export default Alanai;
