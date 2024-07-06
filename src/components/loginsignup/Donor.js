import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { AddEventForm } from "./AddEventForm";
import { EventList } from "./EventList";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { BookedFood } from "./BookedFood";

export default function Donor() {
  const [name, setName] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDoc(
          doc(db, "userDonor/" + currentUser.uid)
        );
        setName(querySnapshot.data().name);
      } catch (error) {
        navigate("/Ngo");
      }
    }
    fetchData();
  });

  return (
    <div>
      <h3>Welcome ,{name}</h3>
      <h1>Donor</h1>
      <AddEventForm />
      <EventList />
      <BookedFood/>
    </div>
  );
}
