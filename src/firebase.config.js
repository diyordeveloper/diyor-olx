import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQPdFwLOToTSdAWRxCxRV51keNT0gc_-Y",
  authDomain: "diyor-olx-ccb39.firebaseapp.com",
  projectId: "diyor-olx-ccb39",
  storageBucket: "diyor-olx-ccb39.appspot.com",
  messagingSenderId: "1030825078929",
  appId: "1:1030825078929:web:b8d46525f3465d9eabcf30",
  measurementId: "G-VL0K8WQR2H",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
