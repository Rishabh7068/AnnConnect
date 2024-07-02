import React, { useState } from 'react';
import {auth  ,RecaptchaVerifier, signInWithPhoneNumber} from "./firebase";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useAuth } from './AuthProvider';


function Dashboard() {
  const [phone,setPhone] = useState("");
  const [otp,setOtp] = useState("");
  const [user,setUser] = useState(null);
  auth.languageCode = 'en';
  const { currentUser } = useAuth();
  
  // class to store data
  const [formData, setFormData] = useState({
    userType: '',
    organizationName: '',
    name: '',
    address: '',
    mobileNo: '',
    registrationId: '',
    pdfDoc: null,
    otp: '',
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const senOtp = async ()=> {
    console.log(phone);
    try {
      const recaptcha =  new RecaptchaVerifier(auth , "recaptcha" ,{});
      const confirmation = await signInWithPhoneNumber(auth , phone , recaptcha);
      console.log(confirmation);
      setUser(confirmation);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  }
  


  const verifyOtp = async ()=> {
    try {
      const credential = await user.confirm(otp);
      console.log('Phone number verified:', credential.user);
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userType || !formData.organizationName || !formData.name || !formData.address || !formData.mobileNo || !formData.registrationId || !formData.pdfDoc || !formData.agreedToTerms) {
      alert('Please fill in all required fields.');
      return;
    }
  };
  return (
    <div >
      <div>
      <h2>Registration Form for </h2>
      <p>{currentUser.email}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Type:</label>
          <select name="userType" value={formData.userType} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="Feeder">Feeder</option>
            <option value="Donor">Donor</option>
          </select>
        </div>
        <div>
          <label>Organization Name:</label>
          <input type="text" name="organizationName" value={formData.organizationName} onChange={handleChange} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile No.:</label>
          <input type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required />
        </div>
        <div>
          <label>Registration ID:</label>
          <input type="text" name="registrationId" value={formData.registrationId} onChange={handleChange} required />
        </div>
        <div>
          <label>Upload PDF Doc:</label>
          <input type="file" name="pdfDoc" onChange={handleChange} accept=".pdf" required />
        </div>
        <div>
        <div>
      <PhoneInput
      country={'in'}
      value={phone}
      onChange={(phone) => setPhone("+"+phone)}
      />
      <button onClick={senOtp}>Send OTP</button>
      </div>
      <div id="recaptcha" ></div>
      <input
        type="number"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        name="otp"
        id="otp"
      />
      <button onClick={verifyOtp}>Verify</button>
        </div>
        <div>
          <input type="checkbox" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} required />
          <label>I agree to the terms and conditions</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  )
}

export default Dashboard
