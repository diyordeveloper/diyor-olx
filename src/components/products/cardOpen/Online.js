import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../../../firebase.config";
import firebase from "firebase";
import { useAuthContext } from "../../../Contexts/AuthContext";
function Online() {
  const { user } = useAuthContext();

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

  return (
    <>
      {onlines === true ? (
        <div className="online" ref={Ref}></div>
      ) : (
        <span></span>
      )}
    </>
  );
}

export default Online;
