import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useFirebase } from "./FirebaseProvider";

const UploadImage = (props) => {
  const docId = props.docId;
  const fbContext = useFirebase();
  const store = fbContext.store;
  const db = fbContext.db;
  const [file, setFile] = useState();
  const [progress, setProgress] = useState();
  const handleUpload = () => {
    if (!file) {
      alert("Please select a file");
      return;
    }
    const imageRef = ref(store, `hero_pics/${docId}`);
    console.log(`imageRef is `, imageRef);
    const uploadTask = uploadBytesResumable(imageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
        console.log("Upload is: " + percentage + "% done");
        console.log("snapshot.state is: " + snapshot.state);
      },
      (error) => {
        console.log("UPLOAD IMAGE ERROR!", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Hero image available at:", downloadURL);
          const docRef = doc(db, `heroes/${docId}`);
          updateDoc(docRef, { imageUrl: downloadURL });
        });
      }
    );
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          let selectedFile = e.target.files[0];
          setFile(selectedFile);
        }}
      />
      <button onClick={handleUpload}>UPLOAD IMAGE</button>
      {progress ? <div>progress: {progress}%</div> : <div />}
    </div>
  );
};

export default UploadImage;
