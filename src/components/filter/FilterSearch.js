import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useUserContext } from "../../Contexts/Context";
function FilterInput() {
  const { products } = useUserContext();

  return (
    <div className="  d-flex justify-content-between align-items-center mt-4 mt-4">
      <SearchIcon />
      <input
        type="text"
        className="form-control "
        placeholder={`${products.length+' '} e'lonlar yoningizda`}
      />
      <button className="btn btn-secondary ">
        <SearchIcon />
      </button>
    </div>
  );
}

export default FilterInput;
