import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import ListEvent from "./ListEvent";
import Listedevent from "./Listedevent";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "./firebase";

export default function Donor() {
  const [name, setName] = useState("");
  const { currentUser } = useAuth();


  useEffect( () => {
    async function fetchData() {
        const querySnapshot = await getDoc(doc(db, "user/" + currentUser.uid));        
            setName(querySnapshot.data().name);
    }
    fetchData();
    },)
    
  return (
    <div>
      <h3>Welcome ,{name}</h3>
      <div>
      <ListEvent/>
      <Listedevent/>
      </div>
    </div>
  );
}
