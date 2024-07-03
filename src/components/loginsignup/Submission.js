import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { imgDB } from "./firebase";
import { useParams, useNavigate } from "react-router-dom";
import { validate } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const initialState = {
  name: "",
  email: "",
  info: "",
  contact: "",
};

const Submission = () => {
  const [data, setData] = useState(initialState);
  const {name,email,info,contact} = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [url , setUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);


  // useEffect(() => {
  //   const uploadFile = () => {
  //     const name = new Date().getTime() + file.name;
  //     const storageRef = ref(imgDB, file.name);
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on("state_changed", (snapshot) => {
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setProgress(progress);
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is Paused");
  //           break;
  //         case "running":
  //           console.log("upload is running");
  //           break;
  //         default: 
  //           break;
  //       }
  //     },
  //     (error) => {
  //     console.log(error);
  //   },getDownloadURL().then((downloadURL)=>{
  //     setData((prev)=> ({...prev,img: downloadURL}));
  //   }));
  //   }; 

  //   file && uploadFile()
  // }, [file]);

 
  

  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    if (selectedFile) {
      const imgsRef = ref(imgDB, `Imgs/${v4()}`);
      uploadBytes(imgsRef, selectedFile).then((data) => {
        getDownloadURL(data.ref).then((url) => {
          setFile(url);
        });
      });
    }
  };
  

  const handleChange =(e)  =>{
    console.error('data',data)
    setData({...data,[e.target.name]: e.target.value});
  };
 
  

  const handleSubmit =(e) => {
    e.preventDefault();
    if(!name || !email || !info || !contact ){
      alert("fill required");
      return;
    }
  }





  return (
    <div>
      <Grid
        centered
        verticalAlign="middle"
        columns="3"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <div>
              {isSubmit ? (
                <Loader active inline="centered" size="huge" />
              ) : (
                <>
                  <h2>Add User</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Input label="Name" placeholder="Enter Name" name="name" onChange={handleChange} value ={name} autoFocus/>
                    <Form.Input label="Email" placeholder="Enter Email" name="email" onChange={handleChange} value ={email}/>
                    <Form.TextArea label="Info" placeholder="Enter Info" name="info" onChange={handleChange} value ={info}/>
                    <Form.Input label="contact" placeholder="Enter Contact" name="contact" onChange={handleChange} value ={contact}/>

                    <div>
                    <Form.Input label="Upload" type="file"  onChange={handleFileChange}  />
                    
                    </div>
                    
                    <Button primary type="submit" disabled={false }>Submit</Button>
                  </Form>
                </> 
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Submission;
