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
  function UserTimeOut() {
    db.collection("users").doc(uid).update({});
  }
  useEffect(() => {
    if (uid !== null) {
      setOnlines(true);
    } else {
      setOnlines(false);
    }
  });
  return <>{onlines === true ? <div className="online"></div>:null}</>;
}

export default Online;
