import React, { useEffect, useState } from "react";
import NavFot from "../navfot/NavFot";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useUserContext } from "../../Contexts/Context";
import "./home.scss";
import FilterSearch from "../filter/FilterSearch";
import FilterCategory from "../filter/FilterCategory";
import Products from "../products/Products";
import { Alert } from "@mui/material";
import FilterProducts from "../products/FilterProducts";
import { useAuthContext } from "../../Contexts/AuthContext";
import firebase from "firebase";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
function Home() {
  const { uid, user } = useAuthContext();
  const { filteredProducts, products } = useUserContext();
  function UserTimeOut() {
    db.collection("users").doc(uid).update({
      timeout: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
  useEffect(() => {
    let timer = 0;
    if (uid !== null) { 
      timer = setInterval(() => {
        UserTimeOut();
        console.log("update", timer++);
      }, 1000);
    }
  }, []);
  return (
    <div className="row">
      <NavFot>
        {uid !== null ? null : (
          <Alert severity="error">
            {" "}
            E'lon joylashtirish uchun ro'yxatdan o'tishingiz kerak.
            <Link to="/login" className="mar-l">
              Login
            </Link>
            <Link to="/register" className="mar-l">
              Register
            </Link>
          </Alert>
        )}
        <FilterSearch />
        <FilterCategory />
        {/* {filteredProducts.length > 0 &&  <FilterProducts />} */}
        {/* {filteredProducts.length < 1 && products.length > 0 &&  */}
        <Products />
        {/* } */}
      </NavFot>
    </div>
  );
}

export default Home;
