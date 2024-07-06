import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import {  doc, getDoc  } from "firebase/firestore";
import { db } from "./firebase";
import { ListedFood } from "./ListedFood";
import { AddedFood } from "./AddedFood";
import { useNavigate } from "react-router-dom";

export default function Ngo() {
  const [name, setName] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchData() {
      
      try {
        const querySnapshot = await getDoc(
          doc(db, "userFeeder/" + currentUser.uid)
        );
        setName(querySnapshot.data().name);
      } catch (error) {
        navigate("/Donor");
      }
    }
    fetchData();
  });

 
  return (
    <div>
      <h3>Welcome -,{name}</h3>
      <h2>NGO Organization</h2>
      <ListedFood/>
      <AddedFood/>
    </div>
  );
}
