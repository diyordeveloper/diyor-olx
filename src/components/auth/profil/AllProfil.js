import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import { useUserContext } from "../../../Contexts/Context";
import NavFot from "../../navfot/NavFot";
import BakroundImg from "../../../assets/backround/bg.jpg";
import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import Moment from "react-moment";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

import "./allprofils.scss";
import Likes from "../../products/cardOpen/filtered/Likes";
function AllProfil() {
  const navigate = useNavigate();
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
  let { name, email } = useParams();
  const [royxat, setRoyxat] = useState(1);
  return (
    <NavFot>
      {users
        .filter((ff) => ff.name === name || ff.email === email)
        .map((itm, idx) => (
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
                style={{
                  background: `url(${itm.avatarbanner || BakroundImg}) `,
                }}
                className="allprofils_ pt-5 pb-5"
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
                <div className="textuser">
                  <h3 className="username text-white">{itm.name}</h3>
                  <h5 className="  text-white">{itm.email}</h5>
                  <h5>
                    <a
                      href={`tel:${itm.phone}`}
                      className=" text_dec_none  text-white"
                    >
                      +{itm.phone}
                    </a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      <div className="row mt-5">
        <div className="col-3 d-flex flex-column">
          <strong>Shu sahifada qidirish</strong>
          <div className="d-flex align-items-center">
            <SearchIcon className={" mt-4"} />{" "}
            <input
              type={"search"}
              onChange={(e) => setSearchTitle(e.target.value)}
              value={searchTitle}
              placeholder={`${
                products.filter((ff) => ff.name === name || ff.email === email)
                  .length
              } ta e'lon`}
              className={"form-control mt-4"}
            />
          </div>
          <strong className="mt-3">E’lonlarni filtrlash</strong>
          <small>
            Biz{" "}
            {
              products
              .filter((ff) => {
            if (searchTitle == "" &&searchCategory == "") {
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
            disabled={!searchTitle&&!searchCategory}
              className="btn btn-danger btn-sm mar-l "
                onClick={ClearCategory}
            >
              Tozalash
            </button>
          </div>
          <div
            className={`row   cardkorinishida ${royxat === 1 ? "" : "d-none"}`}
          >
            {products
              .filter((ff) => {
            if (searchTitle == "" &&searchCategory == "") {
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
                if (searchTitle == ""&&searchCategory == "") {
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
    </NavFot>
  );
}

export default AllProfil;
