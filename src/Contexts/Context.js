import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const UserContext = createContext({});
export const useUserContext = () => {
  return useContext(UserContext);
};
export function Context({ children }) {
  const navigate = useNavigate();
  // Profil
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const users = await db.collection("users").get();
    const usersArray = [];
    for (var snap of users.docs) {
      var data = snap.data();
      data.ID = snap.id;
      usersArray.unshift({
        ...data,
      });
      if (usersArray.length === users.docs.length) {
        setUsers(usersArray);
      }
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  // hamma productlarni olib kelish
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const products = await db.collection("allproducts").get();
    const productsArray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.unshift({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };

  // Category

  // reklama bannerni olib kelish
  const [banner, setBanner] = useState([]);
  const getBanner = async () => {
    const banner = await db.collection("banner").get();
    const bannerArray = [];
    for (var snap of banner.docs) {
      var data = snap.data();
      data.ID = snap.id;
      bannerArray.unshift({
        ...data,
      });
      if (bannerArray.length === banner.docs.length) {
        setBanner(bannerArray);
      }
    }
  };
  useEffect(() => {
    getProducts();
    getBanner();
  }, []);

  // Cardni bosganda ID chiqarib berish
  function onCardItemClick(itm) {
    db.collection("allproducts")
      .doc(itm.ID)
      .update(itm)
      .then(() => {
        console.log("ID ADDDD" + itm.ID);
      });
  }
  // Filter

  const [searchTitle, setSearchTitle] = useState("");
  const [searchZone, setSearchZone] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  //  Filter Clear
  const ClearCategory = () => {
    setSearchTitle("");
    setSearchZone("");
    setSearchCategory("");
  };

  const AllFunction = {
    products,
    banner,
    searchTitle,
    searchZone,
    setSearchTitle,
    setSearchZone,
    users,
    setSearchCategory,
    searchCategory,
    // Category Filter Home Page
    onCardItemClick,
    ClearCategory,
    //
  };
  return (
    <UserContext.Provider value={AllFunction}>{children}</UserContext.Provider>
  );
}
