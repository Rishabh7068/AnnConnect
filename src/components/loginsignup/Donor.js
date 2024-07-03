import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { getDatabase, ref, child, get } from "firebase/database";
import ListEvent from "./ListEvent";

export default function Donor() {
  const [name, setName] = useState("");
  const { currentUser } = useAuth();
  const dbRef = ref(getDatabase());

  get(child(dbRef, `users/${currentUser.uid}/personal`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setName(snapshot.val().name);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div>
      <h3>Welcome ,{name}</h3>
      <div>
      <ListEvent/>
      </div>
 
    </div>
  );
}
