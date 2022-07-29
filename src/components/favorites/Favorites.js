import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../Contexts/AuthContext";
import { db } from "../../firebase.config";
import Loading from "../Loading/Loading";
import NavFot from "../navfot/NavFot";
import Moment from "react-moment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import Likes from "../products/cardOpen/filtered/Likes";
import { useUserContext } from "../../Contexts/Context";
import "./favorites.scss";
function Favorites() {
  const { onCardItemClick } = useUserContext();
  const navigate = useNavigate();

  const { user, uid } = useAuthContext();

  const [favorites, setFavorites] = useState([]);
  const [royxat, setRoyxat] = useState(1);
  const GetFavorites = async () => {
    const favorites = await db
      .collection("Likes" + " " + user?.name + " " + uid)
      .get();
    const favoritesArray = [];
    for (var snap of favorites.docs) {
      var data = snap.data();
      data.ID = snap.id;
      favoritesArray.unshift({
        ...data,
      });
      if (favoritesArray.length === favorites.docs.length) {
        setFavorites(favoritesArray);
      }
    }
  };
  useEffect(() => {
    GetFavorites();
  }, []);

  function FavoritesDelete() {
    if (window.confirm("Rostdan ham hammasini ochirmoqchimisiz ?"))
      db.collection("Likes" + " " + user?.name + " " + uid)
        .delete()
        .then(() => {
          toast.success("Saralanganlarning hammasi o'chirildi");
          navigate("/");
        });
  }
  function FavoriteDel() {
    // window.location.reload(true)
  }
  return (
    <NavFot>
      {favorites.length === 0 ? (
        <>
          <Link to={"/"} className="text_dec_none">
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
            Orqaga
            {" / "}
            Saralanganlar
          </Link>
          <div
            className="row d-flex align-items-center "
            style={{ height: "500px" }}
          >
            <h1 className="text-center">Sizda saralangan e'lonlar yo'q</h1>
          </div>
        </>
      ) : (
        <div className="row">
          <Link to={"/"} className="text_dec_none">
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
            Orqaga
            {" / "}
            Saralanganlar
          </Link>
          <h2>Saralangan e‘lonlar</h2>
          <div className="d-flex align-items-center justify-content-between ">
            <h5>
              {" "}
              Saralangan e‘lonlar {"( "}
              {favorites.length}
              {" )"}
            </h5>
            <button onClick={FavoritesDelete} className="btn btn-danger">
              Saralanganlarni o'chirish
            </button>
          </div>
          <hr className="mt-4 mb-4" />
          <div className="d-flex align-items-center mb-4">
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
          </div>
          <div
            className={`row   cardkorinishida ${royxat === 1 ? "" : "d-none"}`}
          >
            {favorites.map((itm, idx) => (
              <div className="col-3   " key={idx}>
                <div className="card  ">
                  <div className="photo">
                    <Link
                      onClick={() => onCardItemClick(itm)}
                      to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                    >
                      <img src={itm.url} className={"img-fluid"} alt="Error" />
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
                        <AttachMoneyOutlinedIcon /> {itm.narx} {"  "}{" "}
                        {itm.valyuta}
                      </strong>
                      <a href="#" onClick={FavoriteDel}>
                        <Likes itm={itm} />
                      </a>
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
            {favorites.map((itm, idx) => (
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
                            <AttachMoneyOutlinedIcon /> {itm.narx} {"  "}{" "}
                            {itm.valyuta}
                          </strong>
                          <a href="#" onClick={FavoriteDel}>
                            <Likes itm={itm} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </NavFot>
  );
}

export default Favorites;
