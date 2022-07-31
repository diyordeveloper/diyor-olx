import React, { useState } from "react";
import { useAuthContext } from "../../../Contexts/AuthContext";
import { db, storage } from "../../../firebase.config";
import Spinner from "react-bootstrap/Spinner";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import firebase from "firebase";
import { Modavastil } from "../../../Contexts/ArrCatories";
function ModaStil() {
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
  const [holati, setHolati] = useState("");
  const [razmer, setRazmer] = useState("");

  const [joylashuv, setJoylashuv] = useState("");
  // Contact
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
          `Modavastil/${
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
              `Modavastil/${
                user?.name + " - " + user?.phone + " - " + user?.uid
              }`
            )
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
                  category: Modavastil,
                  narx,
                  valyuta,
                  xususiyYokiBiznes,
                  holati,
                  razmer,
                  joylashuv,
                  name,
                  email,
                  phone,
                  avatarbanner:user?.avatarbanner,
                  avatarimg:user?.avatarimg,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  url,
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

  return (
    <div className="col-12">
      <h2 className="text-center">Moda va Stil</h2>
      <h5 className="text-center">
        Hozircha faqat ayollar va erkaklar kiyimlarini e'lon bera olasiz
      </h5>
      <form
        id="addformModavastil"
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
            <option value="">Tanlang . . .</option>
            <option value="Jismoniy shaxs">Jismoniy shaxs</option>
            <option value="Biznes">Biznes</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="holati">Holati*</label>
          <select
            onChange={(e) => setHolati(e.target.value)}
            className="form-select form-select"
            aria-label="form-select example"
            id="holati"
            required
          >
            <option value="">Tanlang . . .</option>
            <option value="F/b">F/b</option>
            <option value="Yangi">Yangi</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="razmer">O'lcham*</label>
          <input
            type={"number"}
            onChange={(e) => setRazmer(e.target.value)}
            value={razmer}
            id="razmer"
            className="form-control mt-2"
            placeholder="O'lchamni kiriting"
            required
          />
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

        <button className="btn btn-success mt-4" form="addformModavastil">
          {loader ? <Spinner animation="border" size="sm" /> : "Joylashtirish"}
        </button>
      </form>
    </div>
  );
}

export default ModaStil;
