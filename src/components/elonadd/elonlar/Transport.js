import React, { useState } from "react";
import { useAuthContext } from "../../../Contexts/AuthContext";
import { db, storage } from "../../../firebase.config";
import Spinner from "react-bootstrap/Spinner";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import firebase from "firebase";
import { Transport } from "../../../Contexts/ArrCatories";

const qoshimchaoptsiyalarchekbox = [
  {
    values: "Bojxonada rasmiylashtirilgan",
  },
  {
    values: "Elektrko‘zgula",
  },
  {
    values: "El. oyna ko‘targichlar",
  },
  {
    values: "Konditsioner",
  },
  {
    values: "Охоронна система",
  },
  {
    values: "Парктронік",
  },
];

function Transportt() {
  const navigate = useNavigate();
  const { uid, user } = useAuthContext();
  const [loader, setLoader] = useState(false);

  const [progress, setProgress] = useState(0);
  const [sarlavha, setSarlavha] = useState("");
  const [images, setImages] = useState(null);
  const [tavsif, setTavsif] = useState("");
  const [narx, setNarx] = useState("");
  const [valyuta, setValyuta] = useState("");
  const [xususiyYokiBiznes, setXususiyYokiBiznes] = useState("");
  const [model, setModel] = useState("");
  const [kuzovTuri, setKuzovTuri] = useState("");
  const [ishlabChiqarilganYil, setIshlabChiqarilganYil] = useState("");
  const [bosganYol, setBosganYol] = useState("");
  const [uzatmalarQutisi, setUzatmalarQutisi] = useState("");
  const [rang, setRang] = useState("");
  const [dvigatelHajmi, setDvigatelHajmi] = useState("");
  const [yoqilgiTuri, setYoqilgiTuri] = useState("");
  const [mashinaHolati, setMashinaHolati] = useState("");
  const [mulkdorlarSoni, setMulkdorlarSoni] = useState("");
  const [qoshimchaOptsiyalar, setQoshimchaOptsiyalar] = useState([]);
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
          `transport/${user?.name + " - " + user?.phone + " - " + user?.uid}/${
            images.name
          }`
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
              `transport/${
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
                  category: Transport,
                  narx,
                  valyuta,
                  xususiyYokiBiznes,
                  model,
                  kuzovTuri,
                  ishlabChiqarilganYil,
                  bosganYol,
                  uzatmalarQutisi,
                  rang,
                  dvigatelHajmi,
                  yoqilgiTuri,
                  mashinaHolati,
                  mulkdorlarSoni,
                  qoshimchaOptsiyalar,
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
                  
                })
                .catch((err) => {
                  console.log(err.message);
                });
              setLoader(false);
              navigate("/elonsuccessfuly");
            });
        }
      );
    } else {
      toast.error("Maydonni to'ldiring");
    }
  };
  function onQoshimchaOptsiyalar(e) {
    let index;
    if (e.target.checked) {
      qoshimchaOptsiyalar.push(e.target.value);
    } else {
      index = qoshimchaOptsiyalar.indexOf(e.target.value);
      qoshimchaOptsiyalar.splice(index, 1);
    }
    console.log(qoshimchaOptsiyalar);
  }

  return (
    <div className="col-12">
      <h2 className="text-center">Transport</h2>

      <h5 className="text-center">
        Hozircha faqat yengil avto mashinalarni e'lon bera olasiz
      </h5>
      <form
        id="addformtransport"
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
                <option value="">y.e yoki so'm</option>
                <option value="y.e">y.e</option>
                <option value="so'm">so'm</option>
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
          <label htmlFor="Mebelli">Model*</label>
          <select
            onChange={(e) => setModel(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="Mebelli"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="2500">2500</option>
            <option value="Alero">Alero</option>
            <option value="Astro">Astro</option>
            <option value="Avalanche">Avalanche</option>
            <option value="Aveo">Aveo</option>
            <option value="Beretta">Beretta</option>
            <option value="Blazer">Blazer</option>
            <option value="C10">C10</option>
            <option value="C1500">C1500</option>
            <option value="Camaro">Camaro</option>
            <option value="Caprice">Caprice</option>
            <option value="Captiva">Captiva</option>
            <option value="Cavalier">Cavalier</option>
            <option value="Chevelle">Chevelle</option>
            <option value="Chevy Van">Chevy Van</option>
            <option value="Citation">Citation</option>
            <option value="Cobalt">Cobalt</option>
            <option value="Colorado">Colorado</option>
            <option value="Corsica">Corsica</option>
            <option value="Corvette">Corvette</option>
            <option value="Cruze">Cruze</option>
            <option value="El Camino">El Camino</option>
            <option value="Epica">Epica</option>
            <option value="Equinox">Equinox</option>
            <option value="Evanda">Evanda</option>
            <option value="Express">Express</option>
            <option value="G">G</option>
            <option value="Geo storm">Geo storm</option>
            <option value="HHR">HHR</option>
            <option value="Impala">Impala</option>
            <option value="K1500">K1500</option>
            <option value="K30">K30</option>
            <option value="Kalos">Kalos</option>
            <option value="Lacetti">Lacetti</option>
            <option value="Lanos">Lanos</option>
            <option value="Lumina">Lumina</option>
            <option value="Malibu">Malibu</option>
            <option value="Metro">Metro</option>
            <option value="Monte Carlo">Monte Carlo</option>
            <option value="Nexia">Nexia</option>
            <option value="Niva">Niva</option>
            <option value="Nubira">Nubira</option>
            <option value="Prizm">Prizm</option>
            <option value="Rezzo">Rezzo</option>
            <option value="S-10">S-10</option>
            <option value="Savana">Savana</option>
            <option value="Silverado">Silverado</option>
            <option value="SSR">SSR</option>
            <option value="Spark">Spark</option>
            <option value="Suburban">Suburban</option>
            <option value="Tacuma">Tacuma</option>
            <option value="Tahoe">Tahoe</option>
            <option value="Tracker">Tracker</option>
            <option value="Trailblazer">Trailblazer</option>
            <option value="Trans Sport">Trans Sport</option>
            <option value="Uplander">Uplander</option>
            <option value="Van">Van</option>
            <option value="Venture">Venture</option>
            <option value="Viva">Viva</option>
            <option value="Bel Air">Bel Air</option>
            <option value="Classic">Classic</option>
            <option value="Corsa">Corsa</option>
            <option value="LUV D-Max">LUV D-Max</option>
            <option value="Monza">Monza</option>
            <option value="Omega">Omega</option>
            <option value="Zafira">Zafira</option>
            <option value="Celta">Celta</option>
            <option value="Starcraft">Starcraft</option>
            <option value="Tavera">Tavera</option>
            <option value="Vectra">Vectra</option>
            <option value="Matiz">Matiz</option>
            <option value="Damas">Damas</option>
            <option value="Orlando">Orlando</option>
            <option value="Menlo">Menlo</option>
            <option value="Boshqa">Boshqa</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="Kuzov">Kuzov turi*</label>
          <select
            onChange={(e) => setKuzovTuri(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="Kuzov"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="Kabriolet">Kabriolet</option>
            <option value="Пікап">Пікап</option>
            <option value="kupe">kupe</option>
            <option value="Universal">Universal</option>
            <option value="Xetchbek">Xetchbek</option>
            <option value="Miniven">Miniven</option>
            <option value="Yo‘l tanlamas">Yo‘l tanlamas</option>
            <option value="Sedan">Sedan</option>
            <option value="Boshqa">Boshqa</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="chiqarilgan">Ishlab chiqarilgan yili*</label>
          <input
            type={"number"}
            onChange={(e) => setIshlabChiqarilganYil(e.target.value)}
            value={ishlabChiqarilganYil}
            id="chiqarilgan"
            className="form-control mt-2"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="BosganBosgan">Bosgan yo‘li*</label>
          <input
            type={"number"}
            onChange={(e) => setBosganYol(e.target.value)}
            value={bosganYol}
            id="BosganBosgan"
            placeholder="km"
            className="form-control mt-2"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="Kuzov">Uzatmalar qutisi*</label>
          <select
            onChange={(e) => setUzatmalarQutisi(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="Kuzov"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="Mexanik">Mexanik</option>
            <option value="Avtomatik">Avtomatik</option>
            <option value="Boshqa">Boshqa</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="Kuzov">Rang*</label>
          <select
            onChange={(e) => setRang(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="Kuzov"
            required
          >
            <option value="Tanlash">Tanlash . . .</option>
            <option value="Oq">Oq</option>
            <option value="Qora">Qora</option>
            <option value="Ko‘k">Ko‘k</option>
            <option value="Kul">Kul rang</option>
            <option value="Kumush rang">Kumush rang</option>
            <option value="Qizil">Qizil</option>
            <option value="Yashil">Yashil</option>
            <option value="Apelsin">Apelsin</option>
            <option value="Asalt">Asalt</option>
            <option value="Och rang">Och jigar rang</option>
            <option value="Feruza rang">Feruza rang</option>
            <option value="Bronza rang">Bronza rang</option>
            <option value="Olcha rang">Olcha rang</option>
            <option value="Moviy rang">Moviy rang</option>
            <option value="Sariq">Sariq</option>
            <option value="Tilla rang">Tilla rang </option>
            <option value="Jigar rang">Jigar rang</option>
            <option value="Magnolii">Magnolii</option>
            <option value="Jilosiz">Jilosiz</option>
            <option value="Och">Och jigar rang</option>
            <option value="Pushti rang">Pushti rang</option>
            <option value="Safari">Safari</option>
            <option value="Binafsha rang">Binafsha rang</option>
            <option value="Hamelion">Hamelion</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="BosganBosganBosganBosgan">Dvigatel hajmi*</label>
          <input
            type={"number"}
            onChange={(e) => setDvigatelHajmi(e.target.value)}
            value={dvigatelHajmi}
            id="BosganBosganBosganBosgan"
            placeholder="cm³"
            className="form-control mt-2"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="Kuzov">Yoqilg‘i turi*</label>
          <select
            onChange={(e) => setYoqilgiTuri(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="Kuzov"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="Benzin">Benzin</option>
            <option value="Dizel">Dizel</option>
            <option value="Gibrid">Gibrid</option>
            <option value="Gaz/Benzin">Gaz/Benzin</option>
            <option value="Elektro">Elektro</option>
            <option value="Boshqa">Boshqa</option>
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="Kuzov">Mashina holati*</label>
          <select
            onChange={(e) => setMashinaHolati(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="Kuzov"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="Ідеальний">Ідеальний</option>
            <option value="Yaxshi">Yaxshi</option>
            <option value="O'rta">O'rta</option>
            <option value="Ta'mir talab">Ta'mir talab</option>
            <option value="Boshqa">Boshqa</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="Kuzov">Mulkdorlar soni*</label>
          <select
            onChange={(e) => setMulkdorlarSoni(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="Kuzov"
            required
          >
            <option value="">Tanlash . . .</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4+</option>
          </select>
        </div>

        <h5 className="mt-4">Qo‘shimcha optsiyalar*</h5>
        <div className="mt-4">
          <div className="row">
            {qoshimchaoptsiyalarchekbox.map((itm) => (
              <div className="col-4">
                <div className="form-check ">
                  <input
                    onChange={onQoshimchaOptsiyalar}
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

        <button className="btn btn-success mt-4" form="addformtransport">
          {loader ? <Spinner animation="border" size="sm" /> : "Joylashtirish"}
        </button>
      </form>
    </div>
  );
}

export default Transportt;
