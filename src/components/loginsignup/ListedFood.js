import React, { useState } from "react";
import {
  query,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  where,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./AuthProvider";

export const ListedFood = () => {
  const [cars, setCars] = useState([]);
  const [con, setCon] = useState("");
  const [nam, setName] = useState("");
  const { currentUser } = useAuth();

  async function fetchData() {
    const carsData = [];
    const querySnapshot1 = collection(db, "userDonorids");
    const val = await getDocs(querySnapshot1);
  
    for (const doc of val.docs) {
      const x = doc.data().Userid;
      const eventcoll = query(
        collection(db, "userDonor/" + x + "/Events"),
        where("servings", "!=", ""),
        orderBy("date")
      );
      const eve = await getDocs(eventcoll);

      const addcoll = query(
        collection(db, "userFeeder/" + currentUser.uid + "/AddedFood")
      );
      const add = await getDocs(addcoll);
      

      eve.forEach(async (dd) => {
        var fg = false;
        add.forEach((cc) => {
          if (cc.data().id === dd.id) {
            fg = cc.data().flag;
          }
        });

       
        
        carsData.push({
          id: dd.id,
          uidd: doc.data().Userid,
          name: dd.data().name,
          address: dd.data().address,
          date: dd.data().date,
          servings: dd.data().servings,
          on: dd.data().on,
          flag: fg,
          value: 0,
        });
      });
    }

    setCars(carsData);
  }

  const handleAddFood = async (idx, id, uidd) => {
    if (con === "" || nam === "" || cars[idx].value === "") {
      alert("feel all details");
      return;
    }

    let need = cars[idx].value;

    const querySnapshot = await getDoc(
      doc(db, "userDonor/" + uidd + "/Events/" + id)
    );

    let y = querySnapshot.data().servings - need;

    try {
      const eventDoc = doc(db, "userDonor/" + uidd + "/Events", id);
      await updateDoc(eventDoc, { servings: y });
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    try {
      await addDoc(
        collection(db, "userFeeder/" + currentUser.uid + "/AddedFood"),
        {
          uidd,
          id,
          need,
          nam,
          con,
          flag: true,
        }
      );

      setCars((prevCars) => {
        const newCars = [...prevCars];
        newCars[idx].flag = true;
        return newCars;
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <h2>Listed Food From All Donors</h2>
      <button onClick={fetchData}>Show List</button>
      <table border="2px">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Date</th>
            <th>No. Of Servings</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Needed Serving</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={index}>
              <td>{car.name}</td>
              <td>{car.address}</td>
              <td>{car.date}</td>
              <td>{car.servings}</td>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Contact No"
                  onChange={(e) => setCon(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Serving Needed"
                  max={car.servings}
                  value={cars[index].value}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value > car.servings) {
                      setCars((prevCars) => {
                        const newCars = [...prevCars];
                        newCars[index].value = car.servings;
                        return newCars;
                      });
                    } else if(value < 0){
                      setCars((prevCars) => {
                        const newCars = [...prevCars];
                        newCars[index].value =0;
                        return newCars;
                      });
                    }else {
                      setCars((prevCars) => {
                        const newCars = [...prevCars];
                        newCars[index].value = value;
                        return newCars;
                      });
                    }
                  }}
                />
              </td>
              <td>
                <button
                  onClick={() => handleAddFood(index, car.id, car.uidd)}
                  disabled={car.flag}
                >
                  {" "}
                  {car.flag ? "Added" : "Add Food"}{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
