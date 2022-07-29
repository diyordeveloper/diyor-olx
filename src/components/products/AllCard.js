import React from "react";
import NavFot from "../navfot/NavFot";
import { useParams, useLocation } from "react-router-dom";
import MuallifningBoshqaElonlari from "./cardOpen/filtered/MuallifningBoshqaElonlari";
import ShungaOxshashElonlar from "./cardOpen/filtered/ShungaOxshashElonlar";
import CardFilter from "./cardOpen/CardFilter";
import { db } from "../../firebase.config";
function AllCard() {
  const location = useLocation();
  let { category, name, ID } = useParams();
  return (
    <NavFot>
      <div className="row">
        <CardFilter ID={ID} category={category} location={location} />
      </div>
      <div className="row">
        <MuallifningBoshqaElonlari name={name} />
        <ShungaOxshashElonlar category={category} />
      </div>
    </NavFot>
  );
}

export default AllCard;
