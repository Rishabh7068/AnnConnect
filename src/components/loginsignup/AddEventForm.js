import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { useAuth } from "./AuthProvider";

export const AddEventForm = () => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [on, setOn] = useState("");
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const querySnapshot = await getDoc(
        doc(db, "userDonor/" + currentUser.uid)
      );

      setOn(querySnapshot.data().organizationName);
      await addDoc(collection(db, "userDonor/" + currentUser.uid + "/Events"), {
        date,
        name,
        address,
        contact,
        on,
      });

      setDate("");
      setName("");
      setAddress("");
      setContact("");
      setOn("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        required
      />
      <input
        type="tel"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Contact"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};
