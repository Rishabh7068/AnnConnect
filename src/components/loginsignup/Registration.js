import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { getDatabase, ref, set } from "firebase/database";
import StoreImageTextFirebase from "./StoreImageTextFirebase";

function Dashboard() {
  const {currentUser } = useAuth();
  const [usertype, setuserType] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileno, setMobileNo] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [img, setImg] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [flag , setFlag]= useState(true);
  

  function writeUserData() {
    const db = getDatabase();
    set(ref(db, "users/" + currentUser.uid), {
      userType: usertype,
      organizationName: organizationName,
      name: name,
      address: address,
      mobileNo: mobileno,
      registrationId: registrationId,
      pdfURL: img,
      agreedToTerms: agreedToTerms,
    });
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (
      !usertype ||
      !organizationName ||
      !name ||
      !address ||
      !mobileno ||
      !registrationId ||
      !agreedToTerms
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      // Save data to Firebase RTDB
      writeUserData();
      // Handle successful form submission
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again later.");
    }
  };
  return (
    <div>
      <div>
        <h2>Registration Form for </h2>
        {/* <p>{currentUser.email}</p> */}
        <form >
          <div>
            <label>User Type:</label>
            <select
              name="userType"
              value={usertype}
              onChange={(e) => setuserType(e.target.value)}
              required
            >
              <option value="">Select...</option>
              <option value="Feeder">Feeder</option>
              <option value="Donor">Donor</option>
            </select>
          </div>
          <div>
            <label>Organization Name:</label>
            <input
              type="text"
              name="organizationName"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <textarea
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Mobile No.:</label>
            <input
              type="tel"
              name="mobileNo"
              value={mobileno}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Registration ID:</label>
            <input
              type="text"
              name="registrationId"
              value={registrationId}
              onChange={(e) => setRegistrationId(e.target.value)}
              required
            />
          </div>
          <div>
            <div>
              <StoreImageTextFirebase setImg={setImg} setFlag={setFlag}  />
              <p>{img}</p>
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              name="agreedToTerms"
              value={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.value)}
              required
            />
            <label>I agree to the terms and conditions</label>
          </div>
          <button type="submit" disabled={flag} onClick={handleSubmit} >Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
