import React, { useState } from "react";
import { useAuthContext } from "../../../../Contexts/AuthContext";
import { toast } from "react-toastify";
import { db } from "../../../../firebase.config";
import { v4 } from "uuid";
import firebase from "firebase";

function Comment({ id, itm }) {
  const { user, uid } = useAuthContext();
  const [loaderr, setLoaderr] = useState(false);
  function onCommentPush(e) {
    e.preventDefault();
    setLoaderr(true);
    const comment = e.target[0].value;

    if (comment.length >= 10) {
      db.collection("users")
        .doc(itm.useruid)
        .collection("comment")
        .add({
          name: user?.name,
          email: user?.email,
          phone: Number(user?.phone),
          comment,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((res) => {
          console.log(res);
          toast.success("Izoh yozdingiz !");
          // if (res) {
          //   window.location.reload(true);
          // }
        })
        .catch((err) => {
          console.log(err.message);
        });
      setLoaderr(false);
    } else {
      toast.error("Kamida 10 ta belgi yozing");
    }
  }
  return (
    <div>
      <div className="comment_">
        <form onSubmit={onCommentPush} id="Comment">
          <textarea
            maxLength={800}
            className="form-control"
            placeholder="Izoh yozing"
          ></textarea>
          <button className="btn btn-success mt-3 " form="Comment">
            Yuborish
          </button>
        </form>
      </div>
    </div>
  );
}

export default Comment;
