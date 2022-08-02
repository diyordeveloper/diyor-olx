import React, { useEffect, useRef } from "react";
import { useUserContext } from "../Contexts/Context";
import Modal from "react-bootstrap/Modal";
import NavFot from "../components/navfot/NavFot";
import Audio1 from "./audio/salom.ogg";
import Audio2 from "./audio/audioo1.ogg";
function ModalDocumentation() {
  const {} = useUserContext();

  return (
    <NavFot>
      <div className="row mt-2">
        <h2 className="text-center">Yordamchi mikrofon yo'riqnomasi</h2>
        <div className="col-12">
          <audio src={Audio1} controls />
          <audio src={Audio2} controls />
          <hr />
        </div>
        <h4>Mikrofonga hozircha qo'shilgan funksiyalar</h4>
        <div className="col-12 d-flex flex-column">
          <strong>1: hi | hello </strong>
          <strong>2: ok | ok bro</strong>
          <strong>3: speak?</strong>
          <strong>4: speak english?</strong>
          <strong>5: speak uzbek?</strong>
          <strong>6: good job </strong>
          <strong>7: wery good </strong>
          <strong>8: are you wrong </strong>
          <strong>9: are you ready </strong>
          <hr />
          <strong>1: home page | back | go back - bosh sahifaga qaytish</strong>
          <strong>
            2: documentation | open documentation - mana shu yo'riqnomani ochib
            beradi
          </strong>
          <strong>
            3: profil | open my profil - agar ro'yxatdan o'tgan bo'lsangiz
            profilga olib o'tadi
          </strong>
          <strong>
            4: favorites | open my favorites - agar ro'yxatdan o'tgan bo'lsangiz
            saralanganlarga olib o'tadi
          </strong>
          <strong>
            5: add | to announce - E'lon berish sahifasiga olib o'tadi
          </strong>
          <strong>
            6: register - Ro'yxatdan o'tish sahifasiga olib o'tadi
          </strong>
          <strong>7: login - Kirish sahifasiga olib o'tadi</strong>
          <strong>8: logout - saytdan chiqarib yuboradi</strong>
          <strong>9: reload - saytni yangilaydi {" ( refresh ) "}</strong>
        </div>
      </div>
    </NavFot>
  );
}

export default ModalDocumentation;
