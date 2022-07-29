import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0ZjIocpfY8KiE-m9_th92fGOGvJn9ky4",
  authDomain: "diyor-olx-e59e2.firebaseapp.com",
  projectId: "diyor-olx-e59e2",
  storageBucket: "diyor-olx-e59e2.appspot.com",
  messagingSenderId: "535261275598",
  appId: "1:535261275598:web:ffac5596e774ea0426f79f",
  measurementId: "G-8RLCNPB4V0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
