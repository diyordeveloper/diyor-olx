import { IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import NavFot from "../navfot/NavFot";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./NotFound404.scss";
function NotFound404() {
  return (
    <NavFot>
      <div className="notfound">
        <h1>404</h1> 
          <h2>Sahifa topilmadi</h2>
          <Link to={"/"} className="text_dec_none">
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
                Orqaga
                {" / "}
                404
              </Link>
      </div>
    </NavFot>
  );
}

export default NotFound404;
