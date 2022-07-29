import React, { useEffect, useState } from "react";
import NavFot from "../navfot/NavFot";
import { useParams, useLocation } from "react-router-dom";
import MuallifningBoshqaElonlari from "./cardOpen/filtered/MuallifningBoshqaElonlari";
import ShungaOxshashElonlar from "./cardOpen/filtered/ShungaOxshashElonlar";
import CardFilter from "./cardOpen/CardFilter";
import { db } from "../../firebase.config";
import Loading from "../Loading/Loading";
function AllCard() {
  const location = useLocation();
  let { category, name, ID, sarlavha } = useParams();
  const [cardArr, setCardArr] = useState([]);
  useEffect(() => {
    db.collection("allproducts")
      .doc(ID)
      .get()
      .then((snapshot) => {
        if (snapshot) {
          setCardArr(snapshot.data());
        }
      });
  }, []);
  console.log("bu id" + ID);
  return (
    <>
      {cardArr.length === 0 ? (
        <Loading />
      ) : (
        <NavFot>
          <div className="row">
            <CardFilter
              ID={ID}
              cardArr={cardArr}
              category={category}
              location={location}
            />
          </div>
          <div className="row">
            <MuallifningBoshqaElonlari name={name} />
            <ShungaOxshashElonlar category={category} />
          </div>
        </NavFot>
      )}
    </>
  );
}

export default AllCard;
