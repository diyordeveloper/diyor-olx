import React from "react";
import { useUserContext } from "../../Contexts/Context";

function FilterProducts() {
    const {  category} = useUserContext();
  return (
    <div className="col-12 mt-5">
      <h2 className="text-center">{category}</h2>
    </div>
  );
}

export default FilterProducts;
