import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { getDatabase, ref, set, child, get } from "firebase/database";

export default function ListEvent() {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
 
 


  function writeUserData() {
    console.log(readUserData()+ " resasd" );
    let x = readUserData()+1;
    let st = x.toString();

    console.log(x + " ssdasd" + st); 
    const db = getDatabase();
    set(ref(db, `users/${currentUser.uid}/listed_evet/${st}`), {
      key : x,
      name: name,
      address: address,
      contact: contact,
      date: date,
      noOfServing: 0,
    });
  }

  function readUserData(){
    let ans  = 0;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${currentUser.uid}/listed_evet`))
      .then((snapshot) => {
        if (snapshot.exists()) {
         ans = Object.keys(snapshot.val()).length;
         console.log(snapshot.val());
         console.log(ans);

        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

      return ans;
  }

  const handleonclick = async (e) => {
    e.preventDefault();

    if (name === "" || address === "" || contact === "" || date === "") {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Save data to Firebase RTDB
      writeUserData();
      alert("Event Added successfully");
      setName("");
      setAddress("");
      setContact("");
      setDate("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again later.");
    }
  };

  return (
    <div>
      <h2>List Event</h2>
      <form action="sumbit">
        <table border="2px">
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Address</th>
            <th>Contact No</th>
            <th>Add</th>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </td>
            <td>
              <input
                type="date"
                name="date"
                id="date"
                value={date}
                required
                onChange={(e) => setDate(e.target.value)}
              />
            </td>
            <td>
              <input
                type="address"
                name="address"
                id="address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </td>
            <td>
              <input
                type="contact"
                name="contact"
                id="contact"
                value={contact}
                required
                onChange={(e) => setContact(e.target.value)}
              />
            </td>
            <td>
              <button type="submit" onClick={handleonclick}>
                Add
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}
