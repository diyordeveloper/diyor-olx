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
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };
  // Category
  const [categories, setCategories] = useState([]);
  const getCategory = async () => {
    const categories = await db.collection("categories").get();
    const categoriesArray = [];
    for (var snap of categories.docs) {
      var data = snap.data();
      data.ID = snap.id;
      categoriesArray.push({
        ...data,
      });
      if (categoriesArray.length === categories.docs.length) {
        setCategories(categoriesArray);
      }
    }
  };
   
  // reklama bannerni olib kelish
  const [banner, setBanner] = useState([]);
  const getBanner = async () => {
    const banner = await db.collection("banner").get();
    const bannerArray = [];
    for (var snap of banner.docs) {
      var data = snap.data();
      data.ID = snap.id;
      bannerArray.push({
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
    getCategory(); 
  }, []);



  // 
  const [cardItemCategory, setCardItemCategory] = useState(""); 
   function onCardItemClick(itm){
    setCardItemCategory(itm.category)   
      db.collection("allproducts")
        .doc(itm.ID)
        .set(itm)
        .then(() => {
          console.log("successfully added to cart");
        }); 
   }
  // Filter
  const [active_category, setActive_Category] = useState("");
  const [category, setCategory] = useState("");
  const CategoryFilters = (itm) => {
    setActive_Category(itm.id);
    filterFunction(itm.category);
    setCategory(itm.category);
    console.log(itm);
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
    setFilteredProducts([]);
    setActive_Category("");
    setCategory("");
  };
   console.log(cardItemCategory);
  const AllFunction = {
    products,
    banner,
    categories, 
    cardItemCategory, 
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
