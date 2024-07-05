import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import {  doc, getDoc  } from "firebase/firestore";
import { db } from "./firebase";
import { ListedFood } from "./ListedFood";
import { AddedFood } from "./AddedFood";

export default function Ngo() {
  const [name, setName] = useState("");
  const { currentUser } = useAuth();
  
  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDoc(
        doc(db, "userFeeder/" + currentUser.uid)
      );
      setName(querySnapshot.data().name);
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
