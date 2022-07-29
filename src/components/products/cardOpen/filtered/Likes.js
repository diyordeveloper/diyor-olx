import React, { useState, useEffect, useReducer } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { db } from "../../../../firebase.config";
import { useAuthContext } from "../../../../Contexts/AuthContext";
import { toast } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
function Likes({ itm }) {
  const navigate = useNavigate();

  const { uid, user } = useAuthContext();
  const [likes, setLikes] = useState(false);
  const [likesArr, setLikesArr] = useState([]);
  const getLikee = async () => {
    const likesArr = await db
      .collection("Likes" + " " + user?.name + " " + uid)
      .get();
    const likesArrArray = [];
    for (var snap of likesArr.docs) {
      var data = snap.data();
      data.ID = snap.id;
      likesArrArray.unshift({
        ...data,
      });
      if (likesArrArray.length === likesArr.docs.length) {
        setLikesArr(likesArrArray);
      }
    }
  };
  useEffect(() => {
    getLikee();
  }, []);
  useEffect(() => {
    setLikes(likesArr.findIndex((l) => l.ID === itm.ID) !== -1);
  }, [likesArr]);

  let ItemLikes;
  async function OnLikes(itm) {
    console.log(itm);
    ItemLikes = itm;
    if (uid !== null) {
      if (likes) {
        await db
          .collection("Likes" + " " + user?.name + " " + uid)
          .doc(itm.ID)
          .delete()
          .then(() => {
            toast.error("Saralanganlardan o'chirildi");
            setLikes(false);
          });
      } else {
        await db
          .collection("Likes" + " " + user?.name + " " + uid)
          .doc(itm.ID)
          .set(ItemLikes)
          .then(() => {
            toast.success("Saralanganlarga qo'shish");
            setLikes(true);
          });
      }
    } else {
      navigate("/register");
    }
  }

  console.log(likes + "  likees");
  return (
    <IconButton onClick={() => OnLikes(itm)}>
      {likes ? (
        <FavoriteIcon style={{ color: "#002F34" }} />
      ) : (
        <FavoriteBorderIcon />
      )}
    </IconButton>
  );
}

export default Likes;
