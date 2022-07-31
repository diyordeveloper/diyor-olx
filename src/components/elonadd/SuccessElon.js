import React, { useEffect, useState } from "react";
import NavFot from "../navfot/NavFot";
import SuccessImg from "../../assets/backround/Success.png";
import { Link } from "react-router-dom"; 
import Confetti from "react-confetti";
function SuccessElon() { 
    const [show,setShow] = useState(true)

    useEffect(() => {
        setInterval(() => {
            setShow(false)
        }, 4000);
    },[]);
  return (
    <NavFot>
  
            <Confetti width={window.innerWidth} recycle={show} numberOfPieces={800} height={window.innerHeight} />
        
     
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card pt-5 pb-5 d-flex align-items-center justify-content-center">
            <div className="photo">
              <img src={SuccessImg} className={"img-fluid"} alt="Error!!" />
            </div>
            <h2 className=" mt-4 text-center">E‘lon faollashtirildi</h2>
            <Link to={"/elon"} className=" mt-4 btn btn-success">
              Yana bitta e‘lon qo‘shish
            </Link>
            <Link to={"/"} className=" mt-4 btn btn-link">
              Bosh sahifaga qaytish
            </Link>
          </div>
        </div>
      </div>
    </NavFot>
  );
}

export default SuccessElon;
