import React, {useState} from "react";
import {storage} from "../Config/firebase";
import {Form, Image, Button} from "react-bootstrap";


function FileUpload(){

    const[image,setImage] = useState(null);
    const [url,setUrl] = useState("");
    const [progress,setProgress] =useState(0);

    const handleChange = e =>{
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }

    }
    const handleUpload = () =>  {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) *100
                );
                setProgress(progress);
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url =>{
                    setUrl(url);
                });
            }
        );
    };

    console.log("image: ", image);

    return(
        <div>
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Imagen</Form.Label>
        <br></br>
        <Form.Control type="file" onChange={handleChange}/>
        <Button onClick={handleUpload}>Subir</Button>
        <progress value={progress} max="100"></progress>
        <Image src={url} alt="product_image"></Image>

        </Form.Group>
        </div>
    )
}
export default FileUpload;