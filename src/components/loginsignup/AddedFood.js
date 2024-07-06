import React, { useState } from "react";
import { collection, getDocs ,doc,getDoc } from "firebase/firestore"; 
import { db } from "./firebase";
import { useAuth } from "./AuthProvider";


export const AddedFood = () =>  {
  const [cars, setCars] = useState([]);
  const {currentUser} = useAuth();

  async function fetchData() {
    const carsData = [];
    
    const querySnapshot1 = collection(db, "userFeeder/" + currentUser.uid + "/AddedFood");
    const val = await getDocs(querySnapshot1);
    for (const docc of val.docs) {
      const x = docc.data().uidd;
      const y = docc.data().id;

      const eveDoc = await getDoc(doc(db, "userDonor/" + x + "/Events/" + y));
      const orgDoc = await getDoc(doc(db, "userDonor/" + x));

      carsData.push({
          oa: orgDoc.data().organizationName,
          date: eveDoc.data().date,
          name: eveDoc.data().name,
          add: eveDoc.data().address,
          con: eveDoc.data().contact,
          reserve: docc.data().need,
        });
    }

    setCars(carsData);
  }


  return (
    <div>
      <h2>Confirm Food </h2>
      <button onClick={fetchData} >Show Confirm Food</button>
      <table border="2px">
        <thead>
          <tr>
            <th>Organization Name</th>
            <th>Date</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Reserved Serving</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={index}>
              <td>{car.oa}</td>
              <td>{car.date}</td>
              <td>{car.name}</td>
              <td>{car.add}</td>
              <td>{car.con}</td>
              <td>{car.reserve}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
