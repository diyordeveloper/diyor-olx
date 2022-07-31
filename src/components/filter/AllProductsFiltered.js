import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../../Contexts/Context";
import NavFot from "../navfot/NavFot";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Moment from "react-moment";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  Bolalardunyosi,
  Kochmasmulk,
  Transport,
  Ish,
  Hayvonlar,
  Uyvabog,
  Elektrjihozlari,
  Xizmatlar,
  Modavastil,
  Xobbisport,
} from "../../Contexts/ArrCatories";
import Likes from "../products/cardOpen/filtered/Likes";
import FilterSearch from "./FilterSearch";
import "./AllProductsFiltered.scss";
function AllProductsFiltered() {
  let { category } = useParams();
  const Bins = "Biznes";
  const Xususy = "Jismoniy shaxs";
  const [royxat, setRoyxat] = useState(1);
  const {
    onCardItemClick,
    products,
    setSearchCategory,
    searchCategory,
    searchTitle,
    setSearchTitle,
    ClearCategory,
    users,
    narxSearch,
    valyutaSearch,
    biznesYokiXususiyFilter,
    setNarxSearch,
    setValyutaSearch,
    setBiznesYokiXususiyFilter,
    searchZone,
    setSearchZone,
  } = useUserContext();
  function Clearr(){
    ClearCategory()
    setSearchCategory('')
  }
  return (
    <>
      <NavFot>
        <div className="  d-flex justify-content-between align-items-center mt-4 mt-4">
          <SearchIcon />
          <input
            type={"search"}
            className="form-control  pt-2 pb-2"
            placeholder={`Nimani qidirayapsiz ?`}
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
        <div className="row mt-2">
          <h3>Filterlar</h3>
          <div className="d-flex align-items-center ">
            <div className="mar-r">
              <label htmlFor="SelectFiltered">Rukn*</label>
              <select
                id="SelectFiltered"
                onChange={(e) => setSearchCategory(e.target.value)}
                defaultValue={category}
                className="form-control  mar-r"
              >
                <option value="">Istalgan toifa...</option>
                <option value="Bolalar dunyosi">
                  Bolalar dunyosi
                  {" - "}
                  {
                    products.filter((ff) => {
                      return ff.category === Bolalardunyosi;
                    }).length
                  }
                  {" ta "}
                </option>
                <option value="Ko'chmas mulk">
                  Ko'chmas mulk {" - "}
                  {
                    products.filter((ff) => {
                      return ff.category === Kochmasmulk;
                    }).length
                  }
                  {" ta "}
                </option>
                <option value="Transport">
                  Transport {" - "}
                  {
                    products.filter((ff) => {
                      return ff.category === Transport;
                    }).length
                  }
                  {" ta "}
                </option>
                <option value="Ish">
                  Ish {" - "}
                  {
                    products.filter((ff) => {
                      return ff.category === Ish;
                    }).length
                  }
                  {" ta "}
                </option>
                <option value="Hayvonlar">
                  Hayvonlar {" - "}
                  {
                    products.filter((ff) => {
                      return ff.category === Hayvonlar;
                    }).length
                  }
                  {" ta "}
                </option>
                <option value="Uy va bog'">
                  Uy va bog' {" - "}
                  {
                    products.filter((ff) => {
                      return ff.category === Uyvabog;
                    }).length
                  }
                  {" ta "}
                </option>
                <option value="Elektr jihozlari">
                  Elektr jihozlari {" - "}
                  {
                    products.filter((ff) => {
                      return ff.category === Elektrjihozlari;
                    }).length
                  }
                  {" ta "}
                </option>
                <option value="Xizmatlar">
                  Xizmatlar {" - "}
                  {
                    products.filter((ff) => {
                      return ff.category === Xizmatlar;
                    }).length
                  }
                  {" ta "}
                </option>
                <option value="Moda va stil">
                  Moda va stil {" - "}
                  {
                    products.filter((ff) => {
                      return ff.category === Modavastil;
                    }).length
                  }
                  {" ta "}
                </option>
                <option value="Xobbi, sport">
                  Xobbi, sport {" - "}
                  {
                    products.filter((ff) => {
                      return ff.category === Xobbisport;
                    }).length
                  }
                  {" ta "}
                </option>
              </select>
              
            </div>

            <div className="mar-r">
              <label htmlFor="Narxchik">Narx*</label>
              <input
                type={"search"}
                onChange={(e) => setNarxSearch(e.target.value)}
                value={narxSearch}
                className="form-control"
              />
            </div>
            <div className="mar-r">
              <label htmlFor="Soooom">Valyuta *</label>
              <select
                id="Soooom"
                onChange={(e) => setValyutaSearch(e.target.value)}
                className="form-control  "
              >
                <option value="">...</option>
                <option value="so'm">so'm</option>
                <option value="y.e">y.e</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <select
              className="form-control-lg"
              onChange={(e) => setBiznesYokiXususiyFilter(e.target.value)}
            >
              <option value="">Hamma e'lonlar...</option>
              <option value="Biznes">
                Biznes
                {" - "}
                {
                  products.filter((ff) => {
                    return ff.xususiyYokiBiznes === Bins;
                  }).length
                }
                {" ta "}
              </option>
              <option value="Jismoniy shaxs">
                Jismoniy shaxs
                {" - "}
                {
                  products.filter((ff) => {
                    return ff.xususiyYokiBiznes === Xususy;
                  }).length
                }
                {" ta "}
              </option>
            </select>
          </div>
        </div>
                <h3 className="mt-3">Biz, {products
            .filter((ff) => {
              if (
                searchTitle == "" &&
                searchCategory == "" &&
                searchZone == "" &&
                // narxSearch == "" &&
                // valyutaSearch == "" &&
                biznesYokiXususiyFilter == ""
              ) {
                return ff;
              } else if (
                ff.sarlavha.toLowerCase().includes(searchTitle.toLowerCase()) &&
                ff.joylashuv.toLowerCase().includes(searchZone.toLowerCase()) &&
                ff.category.toLowerCase().includes(searchCategory.toLowerCase())
                //   &&
                // ff.narx.toLowerCase().includes(setNarxSearch.toLowerCase()) &&
                // ff.valyuta
                //   .toLowerCase()
                //   .includes(setValyutaSearch.toLowerCase()) &&
                // ff.xususiyYokiBiznes
                //   .toLowerCase()
                //   .includes(setBiznesYokiXususiyFilter.toLowerCase())
              ) {
                return ff;
              }
            }).length} ta e'lon topdik</h3>
        <div className="d-flex align-items-center mt-4 mb-4 ">
          <div className="mar-r">Ro'yxat ko'rishi:</div>
          <button
            onClick={() => setRoyxat(1)}
            className={`mar-r btn btn-outline-secondary btn-sm ${
              royxat === 1 ? "bg-secondary text-white" : ""
            } `}
          >
            <GridViewIcon />
          </button>
          <button
            onClick={() => setRoyxat(2)}
            className={`btn  btn-outline-secondary btn-sm ${
              royxat === 2 ? "bg-secondary text-white" : ""
            } `}
          >
            <ViewListIcon />
          </button>
          <button
            disabled={!searchTitle&&!searchCategory
            &&!searchZone
            &&!narxSearch
            &&!valyutaSearch
            }
              className="btn btn-danger  mar-l "
                onClick={Clearr}
            >
              Tozalash
            </button>
        </div>
        {products
            .filter((ff) => {
              if (
                searchTitle == "" &&
                searchCategory == "" &&
                searchZone == "" &&
                // narxSearch == "" &&
                // valyutaSearch == "" &&
                biznesYokiXususiyFilter == ""
              ) {
                return ff;
              } else if (
                ff.sarlavha.toLowerCase().includes(searchTitle.toLowerCase()) &&
                ff.joylashuv.toLowerCase().includes(searchZone.toLowerCase()) &&
                ff.category.toLowerCase().includes(searchCategory.toLowerCase())
                //   &&
                // ff.narx.toLowerCase().includes(setNarxSearch.toLowerCase()) &&
                // ff.valyuta
                //   .toLowerCase()
                //   .includes(setValyutaSearch.toLowerCase()) &&
                // ff.xususiyYokiBiznes
                //   .toLowerCase()
                //   .includes(setBiznesYokiXususiyFilter.toLowerCase())
              ) {
                return ff;
              }
            }).length === 0 ? (
            <div className="mt-5 mb-5 d-flex align-items-center justify-content-center flex-column">
               <h2>E'lonlar topilmadi</h2>
            </div>
          ) : null}
        <div
          className={`row   cardkorinishida ${royxat === 1 ? "" : "d-none"}`}
        >
          {products
            .filter((ff) => {
              if (
                searchTitle == "" &&
                searchCategory == "" &&
                searchZone == "" &&
                // narxSearch == "" &&
                // valyutaSearch == "" &&
                biznesYokiXususiyFilter == ""
              ) {
                return ff;
              } else if (
                ff.sarlavha.toLowerCase().includes(searchTitle.toLowerCase()) &&
                ff.joylashuv.toLowerCase().includes(searchZone.toLowerCase()) &&
                ff.category.toLowerCase().includes(searchCategory.toLowerCase())
                //   &&
                // ff.narx.toLowerCase().includes(setNarxSearch.toLowerCase()) &&
                // ff.valyuta
                //   .toLowerCase()
                //   .includes(setValyutaSearch.toLowerCase()) &&
                // ff.xususiyYokiBiznes
                //   .toLowerCase()
                //   .includes(setBiznesYokiXususiyFilter.toLowerCase())
              ) {
                return ff;
              }
            })
            .map((itm, idx) => (
              <div className="col-4 mb-3   " key={idx}>
                <div className="card  ">
                  <div className="photo">
                    <Link
                      onClick={() => onCardItemClick(itm)}
                      to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                    >
                      <img src={itm.url} className={"img-fluid"} alt="Error" />
                    </Link>
                  </div>
                  <div className="context_">
                    <h4 className="sarlavha">
                      <Link
                        onClick={() => onCardItemClick(itm)}
                        to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                      >
                        <strong>{itm.sarlavha.substr(0, 80)}... </strong>
                      </Link>
                    </h4>
                    <small className="small">
                      <LocationOnOutlinedIcon /> {itm.joylashuv}
                    </small>
                    <small className="small">
                      <AccessTimeOutlinedIcon />{" "}
                      <Moment format="D-MMM-YYYY">
                        {itm.timestamp?.toDate()}
                      </Moment>
                      {" - "}
                      <Moment format="hh:mm:ss">
                        {itm.timestamp?.toDate()}
                      </Moment>
                    </small>
                    <div className="d-flex align-items-center justify-content-between">
                      <strong>
                        <AttachMoneyOutlinedIcon />{" "}
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
                      </strong>
                      <Likes itm={itm} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div
          className={`row   rowxatkorinishida   ${
            royxat === 2 ? "" : "d-none"
          } `}
        >
          {products
            .filter((ff) => {
              if (
                searchTitle == "" &&
                searchCategory == "" &&
                searchZone == "" &&
                // narxSearch == "" &&
                // valyutaSearch == "" &&
                biznesYokiXususiyFilter == ""
              ) {
                return ff;
              } else if (
                ff.sarlavha.toLowerCase().includes(searchTitle.toLowerCase()) &&
                ff.joylashuv.toLowerCase().includes(searchZone.toLowerCase()) &&
                ff.category.toLowerCase().includes(searchCategory.toLowerCase())
                //   &&
                // ff.narx.toLowerCase().includes(setNarxSearch.toLowerCase()) &&
                // ff.valyuta
                //   .toLowerCase()
                //   .includes(setValyutaSearch.toLowerCase()) &&
                // ff.xususiyYokiBiznes
                //   .toLowerCase()
                //   .includes(setBiznesYokiXususiyFilter.toLowerCase())
              ) {
                return ff;
              }
            })
            .map((itm, idx) => (
              <div className="col-12 mt-2  " key={idx}>
                <div className="card   ">
                  <div className="row">
                    <div className="col-3">
                      <div className="photo">
                        <Link
                          onClick={() => onCardItemClick(itm)}
                          to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                        >
                          <img
                            src={itm.url}
                            className={"img-fluid"}
                            alt="Error"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="context_">
                        <h4 className="sarlavha">
                          <Link
                            onClick={() => onCardItemClick(itm)}
                            to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                          >
                            <strong>{itm.sarlavha} </strong>
                          </Link>
                        </h4>
                        <small className="small">
                          <LocationOnOutlinedIcon /> {itm.joylashuv}
                        </small>
                        <small className="small">
                          <AccessTimeOutlinedIcon />{" "}
                          <Moment format="D-MMM-YYYY">
                            {itm.timestamp?.toDate()}
                          </Moment>
                          {" - "}
                          <Moment format="hh:mm:ss">
                            {itm.timestamp?.toDate()}
                          </Moment>
                        </small>
                        <div className="d-flex align-items-center justify-content-between">
                          <strong>
                            <AttachMoneyOutlinedIcon />{" "}
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
                          </strong>
                          <Likes itm={itm} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </NavFot>
    </>
  );
}

export default AllProductsFiltered;
