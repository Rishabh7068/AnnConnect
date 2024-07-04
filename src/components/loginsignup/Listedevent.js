import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, startAfter, limit } from "firebase/firestore"; 
import { db } from "./firebase";
import { useAuth } from "./AuthProvider";

const DonorTable = () => {
  const [donors, setDonors] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const {currentUser} = useAuth();

  const fetchDonors = useCallback(async (nextPage = false) => {
    setLoading(true);

    const donorsRef = collection(db, ""+currentUser.uid);
    let q = query(donorsRef, orderBy("date"), limit(5));

    if (nextPage && lastDoc) {
      q = query(donorsRef, orderBy("date"), startAfter(lastDoc), limit(5));
    }

    const querySnapshot = await getDocs(q);
    const newDonors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    setDonors(prev => {
      const combined = nextPage ? [...prev, ...newDonors] : newDonors;
      const uniqueDonors = combined.filter((donor, index, self) =>
        index === self.findIndex(d => d.id === donor.id)
      );
      return uniqueDonors;
    });

    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);

    setLoading(false);
  }, [lastDoc]);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  return (
    <div>
      <h3>Donors List</h3>
      <table border="2px">
        <thead>
          <tr border="2px">
            <th>Date</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact No</th>
          </tr>
        </thead>
        <tbody border="2px">
          {donors.map(donor => (
              <tr key={donor.id}>
              <td>{donor.date}</td>
              <td>{donor.name}</td>
              <td>{donor.address}</td>
              <td>{donor.contactno}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => fetchDonors(true)} disabled={loading}>Load More</button>
      </div>
    </div>
  );
};

export default DonorTable;
