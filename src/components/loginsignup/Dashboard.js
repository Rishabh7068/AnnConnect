import React, { useState } from 'react';
import {auth  ,RecaptchaVerifier, signInWithPhoneNumber} from "./firebase";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'


function Dashboard() {

  const [phone,setPhone] = useState("");
  const [otp,setOtp] = useState("");
  const [user,setUser] = useState(null);

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

  return (
    <div >
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
  )
}

export default Dashboard
