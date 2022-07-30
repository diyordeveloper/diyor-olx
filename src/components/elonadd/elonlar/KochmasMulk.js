import React, { useState } from "react";
import { useAuthContext } from "../../../Contexts/AuthContext";
import { db, storage } from "../../../firebase.config";
import Spinner from "react-bootstrap/Spinner";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import firebase from "firebase";
import { Kochmasmulk } from "../../../Contexts/ArrCatories";

const joylashuvchexbox = [
  {
    values: "Shaharda",
  },
  {
    values: "Shahar atrofida",
  },
  {
    values: "Qishloq joylarida",
  },
  {
    values: "Trassa chetida",
  },
  {
    values: "Suv havzasi,daryo yaqinida",
  },
  {
    values: "Togʻ etagida",
  },
  {
    values: "Dalahovli hududi",
  },
  {
    values: "Yopiq hududda",
  },
];
const uyxolati = [
  {
    values: "Mualliflik loyihasi",
  },

  {
    values: "Evrotaʼmir",
  },
  {
    values: "Oʻrtacha",
  },
  {
    values: "Taʼmir talab",
  },
  {
    values: "Qora suvoq",
  },
  {
    values: "Tozalashdan avvalgi pardoz",
  },
  {
    values: "Buziladigan",
  },
];
const uysuv = [
  {
    values: "Uyda",
  },
  {
    values: "Markazlashgan suv taʼminoti",
  },
  {
    values: "Oʻtkazish imkoniyati",
  },
  {
    values: "Uchastkada quduq",
  },
  {
    values: "Chekkasida",
  },
  {
    values: "Quduq",
  },
  {
    values: "Yoʻq",
  },
];
const isitishuy = [
  {
    values: "Markazlashgan",
  },
  {
    values: "Gazda",
  },
  {
    values: "Qattiq yoqilgʻida",
  },
  {
    values: "Suyuq yoqilgʻida",
  },
  {
    values: "Elektrda",
  },
  {
    values: "Aralash",
  },
  {
    values: "Isitkichsiz",
  },
];
const uchastkadaborArr = [
  {
    values: "Internet",
  },
  {
    values: "Telefon",
  },
  {
    values: "Suzish havzasi",
  },
  {
    values: "Garaj",
  },
  {
    values: "Konditsioner",
  },
  {
    values: "Maishiy texnika",
  },
  {
    values: "Kanalizatsiya",
  },
  {
    values: "Tomorqa",
  },
  {
    values: "Qoʻriqchi",
  },
  {
    values: "Ertoʻla, omborcha",
  },
  {
    values: "Sauna, hammom",
  },
  {
    values: "Sportzal",
  },
  {
    values: "Yoʻldosh televideniye",
  },
];
const yaqindajoylashgan = [
  {
    values: "Kasalxona, poliklinika",
  },
  {
    values: "Bolalar maydonchasi",
  },
  {
    values: "Bolalar bogʻchasi",
  },
  {
    values: "Bekatlar",
  },
  {
    values: "Park, yashil zona",
  },
  {
    values: "Koʻngilochar muassasalar",
  },
  {
    values: "Restoran, kafelar",
  },
  {
    values: "turargoh",
  },
  {
    values: "Supermarket, doʻkonlar",
  },
  {
    values: "Maktab",
  },
];

function KochmasMulk() {
  const navigate = useNavigate();
  const { currentUser, uid, user } = useAuthContext();
  const [loader, setLoader] = useState(false);

  const [progress, setProgress] = useState(0);
  const [sarlavha, setSarlavha] = useState("");
  const [images, setImages] = useState(null);
  const [tavsif, setTavsif] = useState("");
  const [narx, setNarx] = useState("");
  const [valyuta, setValyuta] = useState("");
  const [xususiyYokiBiznes, setXususiyYokiBiznes] = useState("");
  const [xonalarSoni, setXonalarSoni] = useState("");
  const [umumiyMaydon, setUmumiyMaydon] = useState("");
  const [yashashMaydoni, setYashashMaydoni] = useState("");
  const [joylashuvChekbox, setJoylashuvChekbox] = useState([]);
  const [uyQavatligi, setUyQavatligi] = useState("");
  const [shiftiningBalandligi, setShiftiningBalandligi] = useState("");
  const [mebeli, setMebeli] = useState("");
  const [uchastkaMaydoni, setuchastkaMaydoni] = useState("");
  const [uyHolati, setUyHolati] = useState([]);
  const [uyTuri, setUyTuri] = useState("");
  const [qurilishTuri, setQurilishTuri] = useState("");
  const [suv, setSuv] = useState([]);
  const [elektrTaminoti, setElektrTaminoti] = useState("");
  const [isitish, setIsitish] = useState([]);
  const [gaz, setGaz] = useState("");
  const [sanuzel, setSanuzel] = useState("");
  const [topshiriladiganYil, setTopshiriladiganYil] = useState("");
  const [uchastkadaBor, setUchastkadaBor] = useState([]);
  const [yaqinidaJoylashgan, setYaqinidaJoylashgan] = useState([]);
  const [vositachilikHaqqi, setVositachilikHaqqi] = useState("");
  // Contact
  const [joylashuv, setJoylashuv] = useState("");
  const [name, setName] = useState(`${user?.name}`);
  const [email, setEmail] = useState(`${user?.email}`);
  const [phone, setPhone] = useState(`${user?.phone}`);

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleChangeImages = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImages(selectedFile);
      } else {
        setImages(null);
      }
    } else {
      console.log("please select your file");
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    setLoader(true);
    const promises = [];

    if (sarlavha !== "") {
      const uploadTask = storage
        .ref(
          `Kochmasmulk/${
            user?.name + " - " + user?.phone + " - " + user?.uid
          }/${images.name}`
        )
        .put(images);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref(
              `Kochmasmulk/${
                user?.name + " - " + user?.phone + " - " + user?.uid
              }`
            )
            .child(images.name)
            .getDownloadURL()
            .then((ImageUrl) => {
              db.collection("allproducts")
                .add({
                  filterID: v4(),
                  useruid: uid,
                  sarlavha,
                  tavsif,
                  category: Kochmasmulk,
                  narx,
                  valyuta,
                  xususiyYokiBiznes,
                  xonalarSoni,
                  umumiyMaydon,
                  yashashMaydoni,
                  joylashuvChekbox,
                  uyQavatligi,
                  shiftiningBalandligi,
                  mebeli,
                  uchastkaMaydoni,
                  uyHolati,
                  uyTuri,
                  qurilishTuri,
                  suv,
                  elektrTaminoti,
                  isitish,
                  gaz,
                  sanuzel,
                  topshiriladiganYil,
                  uchastkadaBor,
                  yaqinidaJoylashgan,
                  vositachilikHaqqi,
                  joylashuv,
                  name,
                  email,
                  phone,
                  avatarbanner:user?.avatarbanner,
                  avatarimg:user?.avatarimg,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  url: ImageUrl,
                })
                .then((res) => {
                  console.log(res);
                  toast.success("Muvaffaqqiyatli qo'shildi !");
                  if (res) {
                    window.location.reload(true);
                  }
                })
                .catch((err) => {
                  console.log(err.message);
                });
              setLoader(false);
              navigate("/");
            });
        }
      );
    } else {
      toast.error("Maydonni to'ldiring");
    }
  };
  function onJoylashuvChekbox(e) {
    let index;
    if (e.target.checked) {
      joylashuvChekbox.push(e.target.value);
    } else {
      index = joylashuvChekbox.indexOf(e.target.value);
      joylashuvChekbox.splice(index, 1);
    }
    console.log(joylashuvChekbox);
  }
  function onUyHolati(e) {
    let index;
    if (e.target.checked) {
      uyHolati.push(e.target.value);
    } else {
      index = uyHolati.indexOf(e.target.value);
      uyHolati.splice(index, 1);
    }
    console.log(uyHolati);
  }
  function onSuv(e) {
    let index;
    if (e.target.checked) {
      suv.push(e.target.value);
    } else {
      index = suv.indexOf(e.target.value);
      suv.splice(index, 1);
    }
    console.log(suv);
  } 
  function onIsitish(e) {
    let index;
    if (e.target.checked) {
      isitish.push(e.target.value);
    } else {
      index = isitish.indexOf(e.target.value);
      isitish.splice(index, 1);
    }
    console.log(isitish);
  }
  function onUchastkadaBor(e) {
    let index;
    if (e.target.checked) {
      uchastkadaBor.push(e.target.value);
    } else {
      index = uchastkadaBor.indexOf(e.target.value);
      uchastkadaBor.splice(index, 1);
    }
    console.log(uchastkadaBor);
  } 
  function onYaqinidaJoylashgan(e) {
    let index;
    if (e.target.checked) {
      yaqinidaJoylashgan.push(e.target.value);
    } else {
      index = yaqinidaJoylashgan.indexOf(e.target.value);
      yaqinidaJoylashgan.splice(index, 1);
    }
    console.log(yaqinidaJoylashgan);
  }
  return (
    <div className="col-12">
      <h2 className="text-center">Ko'chmas mulk</h2>

      <h5 className="text-center">
        Hozircha faqat xususiy uylarni e'lon bera olasiz
      </h5>
      <form
        id="addformkochmasmulk"
        className="was-validated"
        onSubmit={onSubmitForm}
      >
        <div className="mt-4">
          <label htmlFor="title" className="">
            Sarlavhani kiriting*
          </label>
          <input
            type="text"
            id="title"
            onChange={(e) => setSarlavha(e.target.value)}
            value={sarlavha}
            className="form-control mt-1"
            placeholder="Masalan, Iphone 11 kafolati bilan"
            minLength={20}
            maxLength={100}
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="file" className=" ">
            Rasmlar*
          </label>
          <br />
          <small>Hozrcha faqat bitta rasm joylay olasiz !</small>
          <input
            type="file"
            id="file"
            className="form-control mt-2"
            // multiple
            onChange={handleChangeImages}
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="tavsif">Tavsif*</label>
          <textarea
            className="mt-2 form-control"
            onChange={(e) => setTavsif(e.target.value)}
            value={tavsif}
            maxLength={900}
            minLength={80}
            rows={5}
            placeholder="O’zingizni shu e'lonni ko’rayotgan odam o’rniga qo’ying va tavsif yozing"
            required
          ></textarea>
          <div className="mt-2 d-flex align-items-center justify-content-between">
            <small>Kamida 80 ta belgi yozing</small>
            <small>{tavsif.length}/9000</small>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="narx">Narx*</label>
          <div className="row align-items-center mt-2">
            <div className="col-10">
              <input
                type={"text"}
                onChange={(e) => setNarx(e.target.value)}
                value={narx}
                id="narx"
                className="form-control "
                placeholder="Narxini kiriting"
                required
              />
            </div>
            <div className="col-2">
              <select
                onChange={(e) => setValyuta(e.target.value)}
                className="form-select form-select"
                aria-label="form-select example"
                id="xususiy"
                required
              >
                <option value="">so'm yoki y.e</option>
                <option value="so'm">so'm</option>
                <option value="y.e">y.e</option>
              </select>
            </div>
          </div>
        </div>
        <h5 className="mt-4">Qo'shimcha ma'lumot</h5>
        <div className="mt-4">
          <label htmlFor="xususiy">Xususiy yoki biznes*</label>
          <select
            onChange={(e) => setXususiyYokiBiznes(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="xususiy"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="Jismoniy shaxs">Jismoniy shaxs</option>
            <option value="Biznes">Biznes</option>
          </select>
        </div>
        <div className="mt-4">
          <div className="mt-4">
            <label htmlFor="xonalar">Xonalar soni*</label>
            <input
              type={"number"}
              onChange={(e) => setXonalarSoni(e.target.value)}
              value={xonalarSoni}
              id="xonalar"
              className="form-control mt-2"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="maydon">Umumiy maydon*</label>
            <input
              type={"number"}
              onChange={(e) => setUmumiyMaydon(e.target.value)}
              value={umumiyMaydon}
              id="maydon"
              placeholder="m²"
              className="form-control mt-2"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="maydon">Yashash maydoni*</label>
            <input
              type={"number"}
              onChange={(e) => setYashashMaydoni(e.target.value)}
              value={yashashMaydoni}
              id="maydon"
              placeholder="m²"
              className="form-control mt-2"
              required
            />
          </div>
        </div>
        <h5 className="mt-4">Joylashuvi*</h5>
        <div className="mt-4">
          <div className="row">
            {joylashuvchexbox.map((itm) => (
              <div className="col-4">
                <div className="form-check ">
                  <input
                  onChange={onJoylashuvChekbox}
                    className="form-check-input"
                    type="checkbox"
                    value={itm.values}
                    id={itm.values}
                  />
                  <label
                    className="form-check-label text-primary"
                    for={itm.values}
                  >
                    {itm.values}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="qavatliligi">Uy qavatliligi*</label>
          <input
            type={"number"}
            onChange={(e) => setUyQavatligi(e.target.value)}
            value={uyQavatligi}
            id="qavatliligi"
            className="form-control mt-2"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="Shiftining">Shiftining balandligi*</label>
          <input
            type={"number"}
            onChange={(e) => setShiftiningBalandligi(e.target.value)}
            value={shiftiningBalandligi}
            id="Shiftining"
            className="form-control mt-2"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="Mebelli">Mebelli*</label>
          <select
            onChange={(e) => setMebeli(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="Mebelli"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="Ha bor">Ha bor</option>
            <option value="Yo'q">Yo'q</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="Uchastka">Uchastka maydoni*</label>
          <input
            type={"number"}
            onChange={(e) => setuchastkaMaydoni(e.target.value)}
            value={uchastkaMaydoni}
            id="Uchastka"
            className="form-control mt-2"
            required
          />
        </div>
        <h5 className="mt-4">Uy holati*</h5>
        <div className="mt-4">
          <div className="row">
            {uyxolati.map((itm) => (
              <div className="col-4">
                <div className="form-check ">
                  <input
                  onChange={onUyHolati}
                    className="form-check-input"
                    type="checkbox"
                    value={itm.values}
                    id={itm.values}
                  />
                  <label
                    className="form-check-label text-primary"
                    for={itm.values}
                  >
                    {itm.values}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="Uyturi">Uy turi*</label>
          <select
            onChange={(e) => setUyTuri(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="Uyturi"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="Uy">Uy</option>
            <option value="Fligel">Fligel</option>
            <option value="Kottej">Kottej</option>
            <option value="Uyning bir qismi">Uyning bir qismi</option>
            <option value="Dala hovli">Dala hovli</option>
            <option value="Taunxaus">Taunxaus</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="QurilishQurilish">Qurilish turi*</label>
          <select
            onChange={(e) => setQurilishTuri(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="QurilishQurilish"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="G'isht">G'isht</option>
            <option value="Panelli">Panelli</option>
            <option value="Monolitli">Monolitli</option>
            <option value="Blokli">Blokli</option>
            <option value="Yog'och">Yog'och</option>
          </select>
        </div>
        <h5 className="mt-4">Suv*</h5>
        <div className="mt-4">
          <div className="row">
            {uysuv.map((itm) => (
              <div className="col-4">
                <div className="form-check ">
                  <input
                  onChange={onSuv}
                    className="form-check-input"
                    type="checkbox"
                    value={itm.values}
                    id={itm.values}
                  />
                  <label
                    className="form-check-label text-primary"
                    for={itm.values}
                  >
                    {itm.values}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="ElektrElektr">Elektr taʼminoti*</label>
          <select
            onChange={(e) => setElektrTaminoti(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="ElektrElektr"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="Bor">Bor </option>
            <option value="Ulanish imkoniyati bor">
              Ulanish imkoniyati bor{" "}
            </option>
            <option value="Yo'q"> Yo'q</option>
          </select>
        </div>
        <h5 className="mt-4">Isitish*</h5>
        <div className="mt-4">
          <div className="row">
            {isitishuy.map((itm) => (
              <div className="col-4">
                <div className="form-check ">
                  <input
                  onChange={onIsitish}
                    className="form-check-input"
                    type="checkbox"
                    value={itm.values}
                    id={itm.values}
                  />
                  <label
                    className="form-check-label text-primary"
                    for={itm.values}
                  >
                    {itm.values}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="GazGaz">Gaz*</label>
          <select
            onChange={(e) => setGaz(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="GazGaz"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="Magistral">Magistral </option>
            <option value="Alohida">Alohida</option>
            <option value="Ulanish imkoniyati bor">
              Ulanish imkoniyati bor
            </option>
            <option value="Yo'q">Yo'q</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="SanuzelSanuzel">Sanuzel*</label>
          <select
            onChange={(e) => setSanuzel(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="SanuzelSanuzel"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="Alohida"> Alohida</option>
            <option value="Aralash"> Aralash</option>
            <option value="2 va undan ko'p sanuzel">
              {" "}
              2 va undan ko'p sanuzel
            </option>
            <option value="Havlida"> Havlida</option>
            <option value="Yo'q"> Yo'q</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="qurilganqurilgan">
            Uy qurilgan/topshiriladigan yil*
          </label>
          <select
            onChange={(e) => setTopshiriladiganYil(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="qurilganqurilgan"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="2018 yilda topshiriladi">
              2018 yilda topshiriladi{" "}
            </option>
            <option value="2017 yilda topshiriladi">
              2017 yilda topshiriladi{" "}
            </option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2011 - 2014">2011 - 2014</option>
            <option value="2001 - 2010">2001 - 2010</option>
            <option value="1990 - 2000">1990 - 2000</option>
            <option value="1980 - 1989">1980 - 1989</option>
            <option value="1960 - 1979">1960 - 1979</option>
            <option value="1960 dan avvall">1960 dan avvall</option>
          </select>
        </div>
        <h5 className="mt-4">Uyda / Uchastkada bor*</h5>
        <div className="mt-4">
          <div className="row">
            {uchastkadaborArr.map((itm) => (
              <div className="col-4">
                <div className="form-check ">
                  <input
                  onChange={onUchastkadaBor}
                    className="form-check-input"
                    type="checkbox"
                    value={itm.values}
                    id={itm.values}
                  />
                  <label
                    className="form-check-label text-primary"
                    for={itm.values}
                  >
                    {itm.values}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <h5 className="mt-4">Yaqinida joylashgan*</h5>
        <div className="mt-4">
          <div className="row">
            {yaqindajoylashgan.map((itm) => (
              <div className="col-4">
                <div className="form-check ">
                  <input
                  onChange={onYaqinidaJoylashgan}
                    className="form-check-input"
                    type="checkbox"
                    value={itm.values}
                    id={itm.values}
                  />
                  <label
                    className="form-check-label text-primary"
                    for={itm.values}
                  >
                    {itm.values}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="VositachilikVositachilik">Vositachilik haqqi**</label>
          <select
            onChange={(e) => setVositachilikHaqqi(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="VositachilikVositachilik"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="Bor">Bor</option>
            <option value="Yo'q">Yo'q</option>
          </select>
        </div>
        <h5 className="mt-4">Aloqa uchun ma'lumotlar</h5>
        <div className="mt-4">
          <label htmlFor="xususiy">Joylashuv*</label>
          <input
            type="text"
            onChange={(e) => setJoylashuv(e.target.value)}
            value={joylashuv}
            id="joylashuv"
            className="form-control mt-2"
            placeholder="Shahar yoki pochta indeksi"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="firstname">Murojaat qiluvchi shaxs*</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            id="firstname"
            className="form-control mt-2"
            placeholder="Odamlar sizga qanday murojat qilishlari kerak ?"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email">Email-manzil*</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            className="form-control mt-2"
            placeholder="Email manzilingizni kiriting"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="phone">Telefon raqami*</label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="text"
            id="phone"
            className="form-control mt-2"
            placeholder="Telefon raqamingiz"
            required
          />
        </div>

        <div className="progress mt-4">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${progress}%` }}
          >
            {progress} %
          </div>
        </div>

        <button className="btn btn-success mt-4" form="addformkochmasmulk">
          {loader ? <Spinner animation="border" size="sm" /> : "Joylashtirish"}
        </button>
      </form>
    </div>
  );
}

export default KochmasMulk;
