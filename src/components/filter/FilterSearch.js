import React from "react";
import SearchIcon from "@mui/icons-material/Search";
function FilterInput() {
  return (
    <div className="  d-flex justify-content-between align-items-center mt-4 mt-4">
      <SearchIcon />
      <input type="text" className="form-control " placeholder="Serach" />
      <button className="btn btn-secondary "><SearchIcon /></button> 
    </div>
  );
}

export default FilterInput;
