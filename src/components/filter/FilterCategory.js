import React from "react";
import { useUserContext } from "../../Contexts/Context";
import "./filterCategory.scss";
import { categories } from "../category/categories";
import { Link, useNavigate } from "react-router-dom";
function FilterCategory() {
  const {products} = useUserContext();
  const navigate = useNavigate();
 
  return (
    <div className="col-12 mt-5">
      <h2 className="text-center">Bosh toifalar</h2>
      <div className="row ">
        {categories.map((itm, idx) => (
          <div key={idx} className="col-2 mt-2">
            <Link to={`/filter/${itm.category}`} className=" card_ text_dec_none text-dark  p-2  " >
              <div className="photo" style={{ background: itm.bg_color }}>
                <img src={itm.url} alt="Errorr!!!" />
              </div>
              <h5 className="cate_name">{itm.category}</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterCategory;
