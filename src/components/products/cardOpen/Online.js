import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../../../firebase.config";
import firebase from "firebase";
function Online() {
  const Ref = useRef();
  //   Uid
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }
  const uid = GetUserUid();
  const [onlines, setOnlines] = useState(false);

  useEffect(() => {
    let times = 0;
    if (uid !== null) {
      setOnlines(true);
      setInterval(() => {
        console.log("update", times + 1);
      }, 1000);
    }
  }, [Ref]);
  return (
    <>{onlines === true ? <div className="online" ref={Ref}></div> : <span></span>}</>
  );
}

export default Online;
