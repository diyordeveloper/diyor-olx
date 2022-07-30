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
  const [active_category, setActive_Category] = useState("");
  const [category, setCategory] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchZone, setSearchZone] = useState("");
  const CategoryFilters = (itm) => {
    setActive_Category(itm.id);
    filterFunction(itm.category);
    setCategory(itm.category);
  };
  const [filteredProducts, setFilteredProducts] = useState([]);
  const filterFunction = (category) => {
    if (products.length > 1) {
      const filter = products.filter((itm) => itm.category === category);
      setFilteredProducts(filter);
    } else {
      console.log("no products to filter");
    }
  };
  //  Filter Clear
  const ClearCategory = () => {
    setActive_Category("");
    filterFunction("");
    setCategory("");
    setSearchTitle("");
    setSearchZone("");
  };

  const AllFunction = {
    products,
    banner,
    searchTitle,
    searchZone,
    setSearchTitle,
    setSearchZone,
    // Category Filter Home Page
    onCardItemClick,
    filteredProducts,
    active_category,
    category,
    CategoryFilters,
    ClearCategory,
    //
  };
  return (
    <UserContext.Provider value={AllFunction}>{children}</UserContext.Provider>
  );
}
