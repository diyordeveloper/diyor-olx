import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase.config";
import firebase from "firebase";
function Online() {
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
    let times = 0
    if (uid !== null) {
      setOnlines(true);
      setInterval(() => { 
        console.log("update", times + 1);
      }, 1000);
    } else {
      setOnlines(false);
    }
  });
  return <>{onlines === true ? <div className="online"></div>:<span></span>}</>;
}

export default Online;
