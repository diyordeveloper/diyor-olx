import React, { useState } from "react";
import { useAuthContext } from "../../../Contexts/AuthContext";
import { db, storage } from "../../../firebase.config";
import Spinner from "react-bootstrap/Spinner";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import firebase from "firebase";
import { Hayvonlar } from "../../../Contexts/ArrCatories";
function Havvonlar() {
  const navigate = useNavigate(); 
  const { currentUser, uid, user } = useAuthContext(); 
  const [images, setImages] = useState(null);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loader, setLoader] = useState(false);
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
    const sarlavha = e.target[0].value;
    const photo = e.target[1].value;
    const tavsif = e.target[2].value;
    const narx = e.target[3].value;
    // Qo'shimcha malumotlar
    const xususiyyokibiznes = e.target[4].value;
    const itzoti = e.target[5].value;
    // Aloqa uchun malumotlar
    const joylashuv = e.target[6].value;
    const name = e.target[7].value;
    const email = e.target[8].value;
    const phone = e.target[9].value;
    const promises = [];

    if (
      (sarlavha !== "",
      photo !== "",
      tavsif !== "",
      narx !== "",
      xususiyyokibiznes !== "",
      itzoti !== "",
      joylashuv !== ""  )
    ) {
      const uploadTask = storage
        .ref(
          `hayvonlar/${user?.name + " - " + user?.phone + " - " + user?.uid}/${
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
              `hayvonlar/${user?.name + " - " + user?.phone + " - " + user?.uid}`
            )
            .child(images.name)
            .getDownloadURL()
            .then((ImageUrl) => {
              setUrls((prevState) => [...prevState, ImageUrl]);
              // All
              db.collection("allproducts")
                .add({
                  
                  category: Hayvonlar,
                  sarlavha,
                  url: ImageUrl ,
                  tavsif,
                  narx: Number(narx),
                  xususiyyokibiznes,
                  itzoti,
                  joylashuv,
                  name,
                  email,
                  phone: Number(phone),
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
      setLoader(false);
    }
    
  };

  return (
    <div className="col-12">
      <h2 className="text-center">Hayvonlar</h2>
      <form id="addformhayvonlar" onSubmit={onSubmitForm}>
        <div className="mt-4">
          <label htmlFor="title" className="">
            Sarlavhani kiriting*
          </label>
          <input
            type="text"
            id="title"
            className="form-control mt-1"
            placeholder="Masalan, Nemis ovcharkasi"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="file" className=" ">
            Rasmlar*
          </label>
          <br />
          <small>
            Hozrcha faqat bitta rasm joylay olasiz !
          </small>
          <input
            type="file"
            id="file"
            className="form-control mt-2"
            // multiple
            onChange={handleChangeImages}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="tavsif">Tavsif*</label>
          <textarea
            className="mt-2 form-control"
            maxLength={900}
            rows={5}
            placeholder="O’zingizni shu e'lonni ko’rayotgan odam o’rniga qo’ying va tavsif yozing"
          ></textarea>
          <div className="mt-2 d-flex align-items-center justify-content-between">
            <small>Kamida 80 ta belgi yozing</small>
            <small>0/9000</small>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="narx">Narx*</label>
          <input
            type="number"
            id="narx"
            className="form-control mt-2"
            placeholder="Narxini kiriting"
          />
        </div>
        <h5 className="mt-4">Qo'shimcha ma'lumot</h5>
        <div className="mt-4">
          <label htmlFor="xususiy">Xususiy yoki biznes*</label>
          <select id="xususiy" className="form-control mt-2">
            <option value="Jismoniy shaxs">Jismoniy shaxs</option>
            <option value="Biznes">Biznes</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="xususiy">It zoti*</label>
          <select id="xususiy" className="form-control mt-2">
          <option value="">Akita</option>
          <option value="">Alyaska malamuti</option>
          <option value="">Amerika buldogi</option>
          <option value="">Ingliz buldogi</option>
          <option value="">Basset</option>
          <option value="">Belьgiya ovcharkasi</option>
          <option value="">Bern zennenxundi</option>
          <option value="">Bigl</option>
          <option value="">Bishon frize</option>
          <option value="">Bokser</option>
          <option value="">Bolonka</option>
          <option value="">Bord dogi</option>
          <option value="">Bulmastif</option>
          <option value="">Bulterer</option>
          <option value="">Burbul</option>
          <option value="">Vest xaylend uayt terer</option>
          <option value="">Sharqiy-evropa ovcharkasi</option>
          <option value="">Griffon</option>
          <option value="">Dalmatin</option>
          <option value="">Djek Rassel</option>
          <option value="">Doberman</option>
          <option value="">Tilla rang retriver</option>
          <option value="">Irlandiya setteri</option>
          <option value="">Irland tereri</option>
          <option value="">Yorkshir tereri</option>
          <option value="">Kavkaz ovcharkasi</option>
          <option value="">Kane Rorso</option>
          <option value="">Pastak pincher</option>
          <option value="">Kerri-blyu terer</option>
          <option value="">Xitoy kokilli iti</option>
          <option value="">Kolli</option>
          <option value="">Labrador Retriver</option>
          <option value="">Layka</option>
          <option value="">Malta bolonkasi</option>
          <option value="">Mastif</option>
          <option value="">Meksika tuksiz iti</option>
          <option value="">Mittelьshnautser</option>
          <option value="">Mops</option>
          <option value="">Moskva qo‘riqchi iti</option>
          <option value="">Nemis ovcharkasi</option>
          <option value="">Nemis dogi</option>
          <option value="">Папійон</option>
          <option value="">Пекінес</option>
          <option value="">Піт-бультер'єр</option>
          <option value="">Померанський шпіц</option>
          <option value="">Pudel</option>
          <option value="">Rizenshnautser</option>
          <option value="">Rodeziy rijbeki</option>
          <option value="">Rotveyler</option>
          <option value="">Rus tozisi</option>
          <option value="">Rus qora terьer</option>
          <option value="">Samoyed iti</option>
          <option value="">Senbernar</option>
          <option value="">Sibir xaskisi</option>
          <option value="">Skay-terьer</option>
          <option value="">Skotch-terer</option>
          <option value="">Spaniyel</option>
          <option value="">O‘rta osiyo ovcharkasi</option>
          <option value="">Staffordshir bultereri</option>
          <option value="">Staffordshir tereri</option>
          <option value="">Taksa</option>
          <option value="">Toy-terer</option>
          <option value="">Foksterer</option>
          <option value="">Frantsuz buldogi</option>
          <option value="">Tsvergpincher</option>
          <option value="">Tsvergshnauser</option>
          <option value="">Chau-chau</option>
          <option value="">Chihuahua</option>
          <option value="">Sharpey</option>
          <option value="">Shelti</option>
          <option value="">Shi-ttsu</option>
          <option value="">Shpits</option>
          <option value="">Erdelterer</option>
          <option value="">Yapon xini</option>
          <option value="">Boshqa</option>

          </select>
        </div>
        <h5 className="mt-4">Aloqa uchun ma'lumotlar</h5>
        <div className="mt-4">
          <label htmlFor="xususiy">Joylashuv*</label>
          <input
            type="text"
            id="joylashuv"
            className="form-control mt-2"
            placeholder="Shahar yoki pochta indeksi"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="firstname">Murojaat qiluvchi shaxs*</label>
          <input
            defaultValue={user?.name}
            type="text"
            id="firstname"
            className="form-control mt-2"
            placeholder="Odamlar sizga qanday murojat qilishlari kerak ?"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email">Email-manzil*</label>
          <input
            defaultValue={user?.email}
            type="email"
            id="email"
            className="form-control mt-2"
            placeholder="Email manzilingizni kiriting"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="phone">Telefon raqami*</label>
          <input
            defaultValue={user?.phone}
            type="number"
            id="phone"
            className="form-control mt-2"
            placeholder="Telefon raqamingiz"
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

        <button disabled={!images} className="btn btn-success mt-4" form="addformhayvonlar">
          {loader ? <Spinner animation="border" size="sm" /> : "Joylashtirish"}
        </button>
      </form>
    </div>
  );
}

export default Havvonlar;
