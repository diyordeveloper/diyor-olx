import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRy3pNAq33ocedRGyGGA2Hq-9v6eC-8iA",
  authDomain: "diyor-olx-4ec90.firebaseapp.com",
  projectId: "diyor-olx-4ec90",
  storageBucket: "diyor-olx-4ec90.appspot.com",
  messagingSenderId: "552385299784",
  appId: "1:552385299784:web:93d18485274b4315681f7d",
  measurementId: "G-013B7CQC6Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
