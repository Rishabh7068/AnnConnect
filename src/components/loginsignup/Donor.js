import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { AddEventForm } from './AddEventForm';
import { EventList } from './EventList';
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
      <h1>NGO Organization</h1>
      <AddEventForm />
      <EventList />
    </div>
  );
}
