import React, {useState, useEffect} from "react";
import {storage} from "../Config/firebase";
import { Image } from "react-bootstrap";


function File(){

 // Get all the images from Storage
    const [files, setFiles] = useState();

useEffect(() => {
    const fetchImages = async () => {
      let result = await storage.ref().child(`images`).listAll();
      let urlPromises = result.items.map((imageRef) =>
        imageRef.getDownloadURL()
      );

      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      setFiles(urls);
    };
    loadImages();
}, []);

  console.log(files);
  return(
    <Image src={files} alt="product_image"></Image>
  )
}

export default File;