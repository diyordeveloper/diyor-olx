import React from "react";
import NavFot from "../navfot/NavFot";
import { Link, useParams } from "react-router-dom";
import BolalardunyosiCard from "./cardOpen/BolalardunyosiCard";
import HayvonlarCard from "./cardOpen/HayvonlarCard";
import MuallifningBoshqaElonlari from "./cardOpen/filtered/MuallifningBoshqaElonlari";
import ShungaOxshashElonlar from "./cardOpen/filtered/ShungaOxshashElonlar"; 
function AllCard() {
  const { ID, category, name } = useParams();
  return (
    <NavFot>
      <div className="row">
        <BolalardunyosiCard category={category} id={ID} />
        <HayvonlarCard category={category} id={ID} />
      </div>
      <div className="row">
        <MuallifningBoshqaElonlari name={name} />
        <ShungaOxshashElonlar />
      </div>
    </NavFot>
  );
}

export default AllCard;
