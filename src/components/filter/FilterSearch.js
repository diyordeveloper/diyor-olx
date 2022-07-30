import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useUserContext } from "../../Contexts/Context";
function FilterInput() {
  const { products, setSearchTitle, setSearchZone ,searchTitle,
    searchZone, } = useUserContext();

  return (
    <div className="  d-flex justify-content-between align-items-center mt-4 mt-4">
      <SearchIcon />
      <input
      type={"search"}
        className="form-control  pt-2 pb-2"
        placeholder={`${products.length + " "} e'lonlar yoningizda`}
        onChange={(e) => setSearchTitle(e.target.value)}
        value={searchTitle}
      />
      <LocationOnOutlinedIcon />
      <input
      type={"search"}
        className="form-control pt-2 pb-2"
        placeholder={`Butun O'zbekiston`}
        onChange={(e) => setSearchZone(e.target.value)}
        value={searchZone}
      />
    </div>
  );
}

export default FilterInput;
