import React from "react";
import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import Likes from "../products/cardOpen/filtered/Likes";
import { useUserContext } from "../../Contexts/Context";
import "./products.scss";

function FilterProducts() {
  const {
    category,
    filteredProducts,
    onCardItemClick,
    searchTitle,
    searchZone,
  } = useUserContext();
  return (
    <div className="col-12 mt-5 allproducts">
      <h2 className="text-center">{category}</h2>
      <div className="row mt-4">
        {filteredProducts
          .filter(
            (f) =>
              f.sarlavha.toLowerCase().includes(searchTitle.toLowerCase()) ||
              f.category.toLowerCase().includes(searchTitle.toLowerCase()) ||
              f.joylashuv.toLowerCase().includes(searchZone.toLowerCase())
          )
          .map((itm, idx) => (
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
                    <Moment format="hh:mm:ss">{itm.timestamp?.toDate()}</Moment>
                  </small>
                  <div className="d-flex align-items-center justify-content-between">
                    <strong>
                      <AttachMoneyOutlinedIcon /> {itm.narx} {"  "}{" "}
                      {itm.valyuta}
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

export default FilterProducts;
