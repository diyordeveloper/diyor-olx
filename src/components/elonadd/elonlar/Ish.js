import React, { useState } from "react";
import { useAuthContext } from "../../../Contexts/AuthContext";
import { db, storage } from "../../../firebase.config";
import Spinner from "react-bootstrap/Spinner";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import firebase from "firebase";
import { Ish } from "../../../Contexts/ArrCatories";

const MasodananRabotaet = [
  {
    values: "Masofadan ishlash",
  },
];

function Ishh() {
  const navigate = useNavigate();

  const { currentUser, uid, user } = useAuthContext();
  const [loader, setLoader] = useState(false);

  const [progress, setProgress] = useState(0);
  const [sarlavha, setSarlavha] = useState("");
  const [images, setImages] = useState(null);
  const [tavsif, setTavsif] = useState("");
  const [narxDan, setNarxDan] = useState("");
  const [narxGacha, setNarxGacha] = useState("");
  const [valyuta, setValyuta] = useState("");
  const [rezyumeLink, setRezyumeLink] = useState("");
  const [taklifQilayabsizmiQidirayabszmi, setTaklifQilayabsizmiQidirayabszmi] =
    useState("");
  const [ishTuri, setIshTuri] = useState("");
  const [bandlikTuri, setBandlikTuri] = useState("");
  const [masofadanIshlashArray, setMasofadanIshlashArray] = useState([]);

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
  console.log(images);
  const onSubmitForm = (e) => {
    e.preventDefault();
    setLoader(true);

    const promises = [];
    if (sarlavha !== "") {
      const uploadTask = storage
        .ref(
          `ish/${user?.name + " - " + user?.phone + " - " + user?.uid}/${
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
            .ref(`ish/${user?.name + " - " + user?.phone + " - " + user?.uid}`)
            .child(images.name)
            .getDownloadURL()
            .then((url) => {
              const Ref = db
                .collection("allproducts")
                .add({
                  filterID: v4(),
                  useruid: uid,
                  sarlavha,
                  tavsif,
                  category: Ish,
                  narxDan,
                  narxGacha,
                  valyuta,
                  rezyumeLink,
                  taklifQilayabsizmiQidirayabszmi,
                  ishTuri,
                  bandlikTuri,
                  masofadanIshlashArray,
                  joylashuv,
                  name,
                  email,
                  phone,
                  avatarbanner:user?.avatarbanner,
                  avatarimg:user?.avatarimg,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  url: url,
                  url2: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fa%2Fa9%2FBlack_x.svg&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ABlack_x.svg&tbnid=gd_sYQlHwfekDM&vet=12ahUKEwim9OjtiZ75AhVnhosKHVYXCmIQMygOegUIARC4AQ..i&docid=mlS8LiwG0bzawM&w=525&h=600&q=photo%20x%20black%20white&ved=2ahUKEwim9OjtiZ75AhVnhosKHVYXCmIQMygOegUIARC4AQ",
                })
                .then((res) => {
                  console.log(res);
                  if(res){
                    window.location.reload(false)
                  }
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
      // setLoader(false);
      toast.error("Maydonni to'ldiring");
    }
  };
  function onMasodananRabotaet(e) {
    let index;
    if (e.target.checked) {
      masofadanIshlashArray.push(e.target.value);
    } else {
      index = masofadanIshlashArray.indexOf(e.target.value);
      masofadanIshlashArray.splice(index, 1);
    }
    console.log(masofadanIshlashArray);
  }
  return (
    <div className="col-12">
      <h2 className="text-center">Ish</h2>
      <h5 className="text-center">
        Hozircha faqat Chakana savdo-sotuvlar e'lon bera olasiz
      </h5>
      <form
        id="addformIsh"
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
            placeholder="Masalan, Bolalar oq ko'ylagi"
            minLength={20}
            maxLength={100}
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="file" className=" ">
            Rasmlar *
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
          <label htmlFor="Rezyume">Rezyume berish formasiga havola*</label>
          <input
            type={"text"}
            onChange={(e) => setRezyumeLink(e.target.value)}
            value={rezyumeLink}
            id="Rezyume"
            className="form-control mt-2"
            autocomplete="off"
            data-cy="partner-offer-url"
            data-testid="partner-offer-url"
            aria-describedby=""
            aria-invalid="false"
            aria-labelledby="external_url-label"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="Taklif">Taklif qilyapsizmi / qidiryapsizmi?</label>
          <select
            onChange={(e) => setTaklifQilayabsizmiQidirayabszmi(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="Taklif"
            required
          >
            <option value="">Tanlang . . .</option>
            <option value="Taklif qilaman">Taklif qilaman</option>
            <option value="Qidirayapman">Qidirayapman</option>
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="narx">Ish haqi*</label>
          <div className="row align-items-center mt-2">
            <div className="col-5">
              <label htmlFor="narxnarxnarx">...dan</label>
              <input
                type={"text"}
                onChange={(e) => setNarxDan(e.target.value)}
                value={narxDan}
                id="narxnarxnarx"
                className="form-control "
                required
              />
            </div>
            <div className="col-5">
              <label htmlFor="narxnarxnarxnarxnarxnarx">...gacha</label>
              <input
                type={"text"}
                onChange={(e) => setNarxGacha(e.target.value)}
                value={narxGacha}
                id="narxnarxnarxnarxnarxnarx"
                className="form-control "
                required
              />
            </div>
            <div className="col-2">
              <label htmlFor=""></label>
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
          <label htmlFor="xususiy">Ish turi*</label>
          <select
            onChange={(e) => setIshTuri(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="xususiy"
            required
          >
            <option value="">Tanlang . . .</option>
            <option value="Doimiy bandlik">Doimiy bandlik</option>
            <option value="Vaqtinchalik bandlik">Vaqtinchalik bandlik</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="xususiy">Bandlik turi*</label>
          <select
            onChange={(e) => setBandlikTuri(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="xususiy"
            required
          >
            <option value="">Tanlang . . .</option>
            <option value="To‘liq stavkada bandlik">
              To‘liq stavkada bandlik
            </option>
            <option value="To‘liq bo‘lmagan bandlik">
              To‘liq bo‘lmagan bandlik
            </option>
          </select>
        </div>
        <div className="mt-4">
          <div className="row">
            {MasodananRabotaet.map((itm) => (
              <div className="col-4">
                <div className="form-check ">
                  <input
                    onChange={onMasodananRabotaet}
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

        <button className="btn btn-success mt-4" form="addformIsh">
          {loader ? <Spinner animation="border" size="sm" /> : "Joylashtirish"}
        </button>
      </form>
    </div>
  );
}

export default Ishh;
