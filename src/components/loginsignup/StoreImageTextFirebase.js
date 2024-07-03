import React, { useState } from "react";
import { imgDB } from "./firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function StoreImageTextFirebase({ setImg }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleUpload = () => {
    if (selectedFile) {
      const imgsRef = ref(imgDB, `Imgs/${v4()}`);
      uploadBytes(imgsRef, selectedFile).then((data) => {
        console.log(data, "imgs");
        getDownloadURL(data.ref).then((url) => {
          setImg(url);
        });
      });
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <br />
      <br />
      <button onClick={handleUpload}>Upload</button>
      <br />
      <br />
    </div>
  );
}

export default StoreImageTextFirebase;
