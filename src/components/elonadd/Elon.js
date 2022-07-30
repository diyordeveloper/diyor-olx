import React, { useState } from "react";
import { useUserContext } from "../../Contexts/Context";
import "./Elon.scss";
import BolalarDunyosi from "./elonlar/BolalarDunyosi";
import ElektrJihozlari from "./elonlar/ElektrJihozlari";
import Havvonlar from "./elonlar/Havvonlar";
import Ish from "./elonlar/Ish";
import KochmasMulk from "./elonlar/KochmasMulk";
import ModaStil from "./elonlar/ModaStil";
import Transport from "./elonlar/Transport";
import UyBog from "./elonlar/UyBog";
import Xizmatlar from "./elonlar/Xizmatlar";
import XobbiSport from "./elonlar/XobbiSport";
import ModalCategory from "./ModalCategory";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NavFot from "../navfot/NavFot";
import { toast } from "react-toastify";
import { useAuthContext } from "../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

function Elon() {
  const {} = useUserContext();
  const { user, currentUser, logout, uid } = useAuthContext();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [cateItm, setCateItm] = useState([]);

  function toggleModal() {
    setShowModal(!showModal);
    if (user?.avatarimg === undefined && user?.avatarbanner === undefined) {
      toast.warning("Profilga rasm qo'ymagansiz !");
      navigate(`/profilim/${user?.name}/${user?.email}`);
    } else {
      toggleModal();
    }
  }
  function onShowForm(id) {
    setShowForm(id);
    toggleModal();
  }
  function onCategoryItm(itm) {
    const arr = cateItm;
    const { url, category, id, bg_color } = itm;

    cateItm.unshift({
      url,
      bg_color,
      category,
      id,
    });
    setCateItm(arr);
    console.log(arr);
  }
  return (
    <NavFot>
      <div className="row  ">
        <Link to={"/"} className="text_dec_none">
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          Orqaga
          {" / "}
          E'lon
        </Link>
        <div className="col-8 offset-2 ">
          <h2 className="text-center">E’lon joylashtirish</h2>
          <h3 className="text-center">
            Bizga e’loningiz haqida gapirib bering
          </h3>
          <hr className="mt-4 mb-2" />

          <div className="row mt-3">
            <label htmlFor="rukn" onClick={toggleModal}>
              Rukn*
            </label>
            <div className="col-6  ">
              {cateItm.length === 0 ? (
                <button
                  id="rukn"
                  className="btn btn-success mt-3 mb-3 pt-3 pb-3 "
                  onClick={toggleModal}
                >
                  Bo‘limni tanlang <ArrowForwardIcon />
                </button>
              ) : (
                <>
                  <>
                    <div
                      className="col-8 category_card mt-3"
                      onClick={toggleModal}
                    >
                      <div
                        id={cateItm[0].id}
                        className={"card card_cate p-2"}
                        style={{ background: cateItm[0].bg_color }}
                      >
                        <div className="row">
                          <div className="col-5">
                            <img
                              src={cateItm[0].url}
                              className="img-fluid"
                              alt="Error!"
                            />
                          </div>
                          <div className="col-7">
                            <strong>{cateItm[0].category} </strong>
                            <ArrowForwardIcon className="icon_" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </>
              )}
            </div>
            <ModalCategory
              onCategoryItm={onCategoryItm}
              showForm={showForm}
              showModal={showModal}
              toggleModal={toggleModal}
              onShowForm={onShowForm}
            />
          </div>
          <div className="row mt-4">
            {cateItm.length === 0 ? null : (
              <>
                <div className={showForm === 1 ? "" : "d-none"}>
                  <BolalarDunyosi />
                </div>
                <div className={showForm === 2 ? "" : "d-none"}>
                  <KochmasMulk />
                </div>
                <div className={showForm === 3 ? "" : "d-none"}>
                  <Transport />
                </div>
                <div className={showForm === 4 ? "" : "d-none"}>
                  <Ish />
                </div>
                <div className={showForm === 5 ? "" : "d-none"}>
                  <Havvonlar />
                </div>
                <div className={showForm === 6 ? "" : "d-none"}>
                  <UyBog />
                </div>
                <div className={showForm === 7 ? "" : "d-none"}>
                  <ElektrJihozlari />
                </div>
                <div className={showForm === 8 ? "" : "d-none"}>
                  <Xizmatlar />
                </div>
                <div className={showForm === 9 ? "" : "d-none"}>
                  <ModaStil />
                </div>
                <div className={showForm === 10 ? "" : "d-none"}>
                  <XobbiSport />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </NavFot>
  );
}

export default Elon;
