import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUpqmeJwPIY6QtSyZJCSScyR5TOMDEzLg",
  authDomain: "diyor-olx-509bd.firebaseapp.com",
  projectId: "diyor-olx-509bd",
  storageBucket: "diyor-olx-509bd.appspot.com",
  messagingSenderId: "821182060752",
  appId: "1:821182060752:web:799dec4dbdc66489fae6d5",
  measurementId: "G-H3PKY550Q2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
