import React from "react";
import { useUserContext } from "../../Contexts/Context";
import "./filterCategory.scss";
import { categories } from "../category/categories";
function FilterCategory() {
  const { active_category, CategoryFilters } = useUserContext();
  return (
    <div className="col-12 mt-5">
      <h2 className="text-center">Bosh toifalar</h2>
      <div className="row ">
        {categories.map((itm, idx) => (
          <div
            key={idx}
            className="col-2 mt-2"
            onClick={() => CategoryFilters(itm)}
          >
            <div
              
              className="
                 card_   p-2 
                  "
            >
              <div className="photo" style={
                itm.id === active_category ? { background: itm.bg_color } : null
              }>
                <img src={itm.url}  alt="Errorr!!!" />
              </div>
              <h5 className="cate_name">{itm.category}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterCategory;
