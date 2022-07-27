import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const AuthContext = createContext({});
export const useAuthContext = () => {
  return useContext(AuthContext);
};
export function AuthContextUser({ children }) {
  const navigate = useNavigate();

  function useAuth() {
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
      const unsub = auth.onAuthStateChanged((user) => setCurrentUser(user));
      return unsub;
    }, []);
    return currentUser;
  }
  const currentUser = useAuth();
  // Profildagi firestore usernamelarni olib keladi
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          db.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data());
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const user = GetCurrentUser();
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
  //   LogOut
  async function logout() {
    if (window.confirm("Rostdan ham akkountdan chiqmoqchimisiz ?")) {
      await auth.signOut();
      navigate("/");
      console.log("Logout");
      toast.success("Akkountingizdan muvaffaqqiyatli chiqdingiz !");
      if(auth){
        window.location.reload(true);
      }
    }
  }
 
  const AllFunction = {
    uid,
    user,
    currentUser,
    logout,
  };
  return (
    <AuthContext.Provider value={AllFunction}>{children}</AuthContext.Provider>
  );
}
