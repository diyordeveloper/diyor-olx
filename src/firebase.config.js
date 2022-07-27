import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0HGGq9YZ9rLAwNkz5YV6cfJvabTZgDr8",
  authDomain: "diyor-olx.firebaseapp.com",
  projectId: "diyor-olx",
  storageBucket: "diyor-olx.appspot.com",
  messagingSenderId: "236903378306",
  appId: "1:236903378306:web:6bcb53044a44d889ab739b",
  measurementId: "G-GVRY84XSCZ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };


