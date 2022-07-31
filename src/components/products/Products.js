import React from "react";
import Moment from "react-moment";
import { useUserContext } from "../../Contexts/Context";
import { Link, useNavigate, useParams } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import Likes from "../products/cardOpen/filtered/Likes";
import "./products.scss";
import { useAuthContext } from "../../Contexts/AuthContext";
function Products() {
  const navigate = useNavigate();

  const { products, onCardItemClick,   } =
    useUserContext();
  const {  uid } = useAuthContext();

    function OnBtn() {
      if (uid !== null) {
        navigate("/elon");
      } else {
        navigate("/register");
      }
    }
  return (
    <div className="col-12 mt-5 allproducts">
      <h2 className="text-center">Hamma Elonlar</h2>
      <div className="row mt-4">
        {
          products && products.length === 0 ?
          <div className="d-flex align-items-center justify-content-center flex-column">
            <h3>DiyorOLX ga e'lonlar joylashtirilmagan  </h3>
            <h5 className="mt-2"> 1-e'lonni siz joylashtiring va o'z biznesingizni boshlang</h5>
            <button  onClick={OnBtn} className="btn btn-success mt-3">E'lon joylashtirish</button>
          </div>
          :null
        }
        {products && products
         
          .map((itm, idx) => (
            <div className="col-3 mt-2  " key={idx}>
              <div className="card  ">
                <div className="photo">
                  <Link
                    onClick={() => onCardItemClick(itm)}
                    to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                  >
                    <img
                      src={itm.url || itm.url2}
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
                    <Moment format="hh:mm:ss">{itm.timestamp?.toDate()}</Moment>
                  </small>
                  <div className="d-flex align-items-center justify-content-between">
                    <strong>
                      <AttachMoneyOutlinedIcon /> {itm.narx && <> {itm.narx}</>}
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
    </div>
  );
}

export default Products;
