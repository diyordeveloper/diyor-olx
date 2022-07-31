import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useUserContext } from "../../Contexts/Context";
import { Link } from "react-router-dom";
function FilterInput() {
  const { products, setSearchTitle, setSearchZone, searchTitle, searchZone,onCardItemClick } =
    useUserContext();
   
  return (
    <div className="  d-flex justify-content-between align-items-center mt-4 mt-4">
      <div
        className="d-flex flex-column  w-50"
        style={{ position: "relative" }}
      >
        <div className="d-flex  align-items-center  ">
          <SearchIcon />
          <input
            type={"search"}
            className="form-control  pt-2 pb-2"
            placeholder={`${products.length + " "} e'lonlar yoningizda`}
            onChange={(e) => setSearchTitle(e.target.value)}
            value={searchTitle}
          />
        </div>
        <ul
          className="list-group   "
          style={{
            position: "absolute",
            left: "20px",
            right: "0px",
            top: "50px",
          }}
        >
          {searchTitle.length === 0 ? null : (
            <>
              {products
                .filter((ff) => {
                  if (searchTitle == "") {
                    return ff;
                  } else if (
                    ff.sarlavha
                      .toLowerCase()
                      .includes(searchTitle.toLowerCase())
                  ) {
                    return ff;
                  }
                })
                .map((itm, idx) => (
                  <Link
                  onClick={() => onCardItemClick(itm)}
                  to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                    key={idx}
                    className="list-group-item list-group-item-action list-group-item-light"
                  >
                    <div className="row">
                      <div className="col-2">
                        <img
                          src={itm.url}
                          style={{
                            height: "80px",
                            width: "80px",
                            objectFit: "cover",
                          }}
                          className={" "}
                          alt="Error!!"
                        />
                      </div>
                      <div className="col-10">
                        <strong>{itm.sarlavha.substr(0, 40)} ... </strong>
                        <br />
                        <small>{itm.category} </small>
                        <br />
                        <small>
                    {itm.narx && <> {itm.narx}</>}
                      <small>
                        {itm.narxDan && (
                          <>
                            {" "}
                            {itm.narxDan}
                            {" - "}
                          </>
                        )}
                        {itm.narxGacha && <> {itm.narxGacha}</>}
                      </small>
                      {"  "} {itm.valyuta}
                      <small>{itm.narxGacha && <> gacha</>}</small>
                    </small>
                      </div>
                    </div>
                  </Link>
                ))}
            </>
          )}
        </ul>
      </div>
      <div className="d-flex w-50 flex-column w-50" style={{ position: "relative" }}>
        <div className="d-flex  align-items-center">
          <LocationOnOutlinedIcon />
          <input
            type={"search"}
            className="form-control pt-2 pb-2"
            placeholder={`Butun O'zbekiston`}
            onChange={(e) => setSearchZone(e.target.value)}
            value={searchZone}
          />
        </div>
        <ul
          className="list-group   "
          style={{
            position: "absolute",
            left: "20px",
            right: "0px",
            top: "50px",
          }}
        >
          {searchZone.length === 0 ? null : (
            <>
              {products
                .filter((ff) => {
                  if (searchZone == "") {
                    return ff;
                  } else if (
                    ff.joylashuv
                      .toLowerCase()
                      .includes(searchZone.toLowerCase())
                  ) {
                    return ff;
                  }
                })
                .map((itm, idx) => (
                  <Link
                  onClick={() => onCardItemClick(itm)}
                  to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                    key={idx}
                    className="list-group-item list-group-item-action list-group-item-light"
                  >
                    <div className="row">
                      <div className="col-2">
                        <img
                          src={itm.url}
                          style={{
                            height: "80px",
                            width: "80px",
                            objectFit: "cover",
                          }}
                          className={" "}
                          alt="Error!!"
                        />
                      </div>
                      <div className="col-10">
                        <strong>{itm.joylashuv}   </strong>
                        <br />
                        <small>{itm.sarlavha} </small>
                        <br />
                      
                      </div>
                    </div>
                  </Link>
                ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FilterInput;
