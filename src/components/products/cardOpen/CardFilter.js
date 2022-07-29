import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Moment from "react-moment";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../Contexts/AuthContext";
import Comment from "./filtered/Comment";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CheckIcon from "@mui/icons-material/Check";
import Likes from "./filtered/Likes";
import { db } from "../../../firebase.config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import "./styleCard.scss";
function CardFilter({ ID, location, category, cardArr }) {
  const { user } = useAuthContext();
  const [copyValue, setCopyValue] = useState(location.pathname);
  const [copy, setCopy] = useState(false);

  function CopyToggle() {
    setCopy(true);
    toast.success("URL manzil nusxalandi");
  }
  useEffect(() => {
    setTimeout(() => {
      setCopy(false);
    }, 5000);
  }, [copy]);

  return (
    <>
      <Link to={"/"} className="text_dec_none">
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        Orqaga
        {" / "}
        {category}
      </Link>
      {ID === cardArr.ID ? (
        <div className="col-12 cardopen">
          <div className="row">
            <div className="col-7 ">
              <div className="photo  ">
                <img src={cardArr.url} className="img-fluid" alt="Error!!!" />
              </div>
              <div className="context_">
                <div className="d-flex align-items-center justify-content-between ">
                  <small className="small">
                    <AccessTimeOutlinedIcon /> Joylashtirildi {" - "}
                    <Moment format="D-MMM-YYYY">
                      {cardArr.timestamp?.toDate()}
                    </Moment>
                    {" - "}
                    <Moment format="hh:mm:ss">
                      {cardArr.timestamp?.toDate()}
                    </Moment>
                  </small>
                  <Likes itm={cardArr} />
                </div>
                <h3 className="mt-2">{cardArr.sarlavha}</h3>
                <h3 className="mt-2">
                  <strong>
                    {cardArr.narx && <>{cardArr.narx}</>}
                    {cardArr.narxDan && (
                      <>
                        {cardArr.narxDan}
                        {" dan "}
                      </>
                    )}
                    {cardArr.narxGacha && <>{cardArr.narxGacha} </>}
                    {"  "} {cardArr.valyuta}
                    {cardArr.narxGacha && <>{" gacha"} </>}
                  </strong>
                </h3>
                <ul className="mt-1 elon_ul">
                  {cardArr.xususiyYokiBiznes && (
                    <li>
                      <p className="elon_btn mt-2  btn-sm mar-r  ">
                        {cardArr.xususiyYokiBiznes}
                      </p>
                    </li>
                  )}
                  {/* BolalarDunyosi */}
                  <>
                    {cardArr.holati && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r  ">
                          Holati: {cardArr.holati}
                        </p>
                      </li>
                    )}
                    {cardArr.razmer && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r  ">
                          O'lcham: {cardArr.razmer}
                        </p>
                      </li>
                    )}
                  </>
                  {/* Kochmas Mulk */}
                  <>
                    {cardArr.xonalarSoni && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Xonalar soni:{"  "} {cardArr.xonalarSoni}
                        </p>
                      </li>
                    )}
                    {cardArr.umumiyMaydon && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Umumiy maydon: {"  "}
                          {cardArr.umumiyMaydon + " м²"}
                        </p>
                      </li>
                    )}

                    {cardArr.yashashMaydoni && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Yashash maydoni: {"  "}
                          {cardArr.yashashMaydoni + " м²"}
                        </p>
                      </li>
                    )}
                    {cardArr.joylashuvChekbox && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Joylashuvi:{"  "} {cardArr.joylashuvChekbox + ""}
                        </p>
                      </li>
                    )}
                    {cardArr.uyQavatligi && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Uy qavatliligi:{"  "} {cardArr.uyQavatligi}
                        </p>
                      </li>
                    )}
                    {cardArr.shiftiningBalandligi && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Shiftining balandligi:{"  "}{" "}
                          {cardArr.shiftiningBalandligi}
                        </p>{" "}
                      </li>
                    )}
                    {cardArr.mebeli && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Mebelli:{"  "} {cardArr.mebeli}
                        </p>
                      </li>
                    )}
                    {cardArr.uchastkaMaydoni && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Uchastka maydoni:{"  "} {cardArr.uchastkaMaydoni}
                        </p>
                      </li>
                    )}
                    {cardArr.uyHolati && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Uy holati:{"  "} {cardArr.uyHolati}
                        </p>
                      </li>
                    )}
                    {cardArr.uyTuri && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Uy turi:{"  "}
                          {cardArr.uyTuri}
                        </p>
                      </li>
                    )}
                    {cardArr.qurilishTuri && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Qurilish turi: {"  "}
                          {cardArr.qurilishTuri}
                        </p>
                      </li>
                    )}
                    {cardArr.suv && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Suv: {"  "}
                          {cardArr.suv}
                        </p>
                      </li>
                    )}
                    {cardArr.elektrTaminoti && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Elektr taʼminoti: {"  "}
                          {cardArr.elektrTaminoti}
                        </p>
                      </li>
                    )}
                    {cardArr.isitish && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Isitish: {"  "}
                          {cardArr.isitish}
                        </p>
                      </li>
                    )}
                    {cardArr.gaz && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Gaz: {"  "}
                          {cardArr.gaz}
                        </p>
                      </li>
                    )}
                    {cardArr.sanuzel && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Sanuzel: {"  "}
                          {cardArr.sanuzel}
                        </p>
                      </li>
                    )}
                    {cardArr.topshiriladiganYil && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Uy qurilgan/topshiriladigan yil: {"  "}
                          {cardArr.topshiriladiganYil}
                        </p>
                      </li>
                    )}
                    {cardArr.vositachilikHaqqi && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Vositachilik haqqi:{"  "}
                          {cardArr.vositachilikHaqqi}
                        </p>
                      </li>
                    )}
                    {cardArr.uchastkadaBor && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Uyda / Uchastkada bor: {"  "}
                          {cardArr.uchastkadaBor + ""}
                        </p>
                      </li>
                    )}

                    {cardArr.yaqinidaJoylashgan && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Yaqinida joylashgan: {"  "}
                          {cardArr.yaqinidaJoylashgan + " "}
                        </p>
                      </li>
                    )}
                  </>
                  {/* Transport */}
                  <>
                    {cardArr.model && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Model:{"  "} {cardArr.model}
                        </p>
                      </li>
                    )}
                    {cardArr.kuzovTuri && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Kuzov turi:{"  "} {cardArr.kuzovTuri}
                        </p>
                      </li>
                    )}
                    {cardArr.ishlabChiqarilganYil && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Ishlab chiqarilgan yili*:{"  "}{" "}
                          {cardArr.ishlabChiqarilganYil}
                        </p>
                      </li>
                    )}
                    {cardArr.bosganYol && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Bosgan yo‘li:{"  "} {cardArr.bosganYol}
                        </p>
                      </li>
                    )}
                    {cardArr.uzatmalarQutisi && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Uzatmalar qutisi:{"  "} {cardArr.uzatmalarQutisi}
                        </p>
                      </li>
                    )}
                    {cardArr.rang && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Rang:{"  "} {cardArr.rang}
                        </p>
                      </li>
                    )}
                    {cardArr.dvigatelHajmi && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Dvigatel hajmi:{"  "} {cardArr.dvigatelHajmi} см³
                        </p>
                      </li>
                    )}
                    {cardArr.yoqilgiTuri && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Yoqilg‘i turi:{"  "} {cardArr.yoqilgiTuri}
                        </p>
                      </li>
                    )}
                    {cardArr.mashinaHolati && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Mashina holati:{"  "} {cardArr.mashinaHolati}
                        </p>
                      </li>
                    )}
                    {cardArr.mulkdorlarSoni && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Mulkdorlar soni:{"  "} {cardArr.mulkdorlarSoni}
                        </p>
                      </li>
                    )}
                    {cardArr.qoshimchaOptsiyalar && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Qo‘shimcha optsiyalar:{"  "}{" "}
                          {cardArr.qoshimchaOptsiyalar + " "}
                        </p>
                      </li>
                    )} 
                  </>
                    {/* Ish */}
                    <>
                    {cardArr.taklifQilayabsizmiQidirayabszmi && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Ish:{"  "}{" "}
                          {cardArr.taklifQilayabsizmiQidirayabszmi + " "}
                        </p>
                      </li>
                    )}
                    {cardArr.ishTuri && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Ish turi:{"  "} {cardArr.ishTuri + " "}
                        </p>
                      </li>
                    )}
                    {cardArr.bandlikTuri && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Bandlik turi:{"  "} {cardArr.bandlikTuri + " "}
                        </p>
                      </li>
                    )}
                    {cardArr.masofadanIshlashArray && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          {"  "} {cardArr.masofadanIshlashArray + " "}
                        </p>
                      </li>
                    )}
                    {cardArr.rezyumeLink && (
                      <li>
                        <input
                          type="text"
                          className="form-control-sm mt-2"
                          value={cardArr.rezyumeLink}
                        />
                      </li>
                    )}</>
                    {/* Hayvonlar */}
                    {cardArr.hayvonTuri && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          hayvon turi:{"  "}{" "}
                          {cardArr.hayvonTuri + " "}
                        </p>
                      </li>
                    )}
                    {cardArr.hayvonZoti && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          hayvon zoti:{"  "}{" "}
                          {cardArr.hayvonZoti + " "}
                        </p>
                      </li>
                    )}
                    
                    {/* Uyva Bog' */}
                    <>
                    {cardArr.mebelTuri && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Mebel turi:{"  "}{" "}
                          {cardArr.mebelTuri + " "}
                        </p>
                      </li>
                    )}
                    {cardArr.qaysiXonaUchun && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                          Xona:{"  "}{" "}
                          {cardArr.qaysiXonaUchun + " "}
                        </p>
                      </li>
                    )}</>
                    {/* Elektr jihozlari */}
                    <>
                    {
                    cardArr.marka && (
                      <li>
                        <p className="elon_btn mt-2  btn-sm mar-r">
                         Marka:{"  "}{" "}
                          {cardArr.marka + " "}
                        </p>
                      </li>
                    )}
                    </>
                </ul>
                <h3 className="mt-3"> Tavsif</h3>
                <p className="mt-2">{cardArr.tavsif}</p>
                <hr />
                <div className="d-flex align-items-center justify-content-between ">
                  <small>ID: {cardArr.ID}</small>
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control-sm mar-r "
                      onChange={(e) => setCopyValue(e.target.value)}
                      value={"https://diyor-olx.vercel.app" + copyValue}
                    />
                    <CopyToClipboard
                      text={"https://diyor-olx.vercel.app" + copyValue}
                    >
                      <button
                        disabled={copy === true}
                        onClick={CopyToggle}
                        className="btn btn-success btn-sm "
                      >
                        {copy === true ? <CheckIcon /> : <ShareOutlinedIcon />}
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
              <Comment itm={cardArr} />
            </div>
            <div className="col-5">
              <div className="user">
                <h5>Foydalanuvchi</h5>
                <div className="row">
                  <div className="col-2">
                    <div className="avatarka">
                      <img
                        src={
                          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                        }
                        className={"img-fluid"}
                        alt="Error"
                      />
                    </div>
                  </div>
                  <div className="col-10">
                    <h4>{cardArr.name}</h4>
                    <h5>
                      <a
                        href={`email:${cardArr.email}`}
                        className={"text_dec_none"}
                      >
                        {cardArr.email}
                      </a>
                    </h5>

                    <small>
                      OLXda{" "}
                      <Moment format="D-MMM-YYYY">
                        {cardArr.timestamp?.toDate()}
                      </Moment>
                      {" - "}
                      <Moment format="hh:mm:ss">
                        {cardArr.timestamp?.toDate()}
                      </Moment>{" "}
                      beri
                    </small>
                    <br />
                    <small>
                      Oxirgi marta{" "}
                      <Moment format="D-MMM-YYYY">
                        {user?.timeout?.toDate()}
                      </Moment>
                      {" - "}
                      <Moment format="hh:mm:ss">
                        {user?.timeout?.toDate()}
                      </Moment>{" "}
                      online bo'lgan
                    </small>
                    <div>
                      <a
                        href={`tel:${cardArr.tel}`}
                        className="btn mt-2 btn-outline-success"
                      >
                        <PhoneForwardedIcon /> Qo'ng'iroq qilish{" "}
                        {"+" + cardArr.phone}
                      </a>
                    </div>
                    <br />
                    <Link
                      className=" mt-4 text_dec_none text-secondary      "
                      to={""}
                    >
                      Muallifning boshqa e'lonlari <ArrowForwardIcon />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="joylashuv mt-3">
                <h5>Joylashuv</h5>
                <h5>
                  <LocationOnOutlinedIcon /> {cardArr.joylashuv}
                </h5>
              </div>
              <div className="reklama mt-3">
                <h5>Bu yerda reklama banner turadi !</h5>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CardFilter;
