import { useState, useEffect, useRef } from "react"
import { CloudinaryContext, Image } from 'cloudinary-react';
import "./UploadWidget.css"

const UploadWidget = ({projectId}) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const num = parseInt(projectId)

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
            cloudName: 'duy4yg4hz',
            uploadPreset: 'tdkborvg'
      },
      (error, result) => {
        if (result.event === 'success') {
            post(result)
        }
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const post = (result) => {
    console.log(result)
    const photoToSendToAPI = {
        publicRef: result.info.public_id, 
        photoURL: result.info.secure_url,
        projectId: num
    }
    setUploadedImage(result.info.public_id)

    return fetch(`${process.env.REACT_APP_API_HOST}/productPhotos`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(photoToSendToAPI)
    })
    .then(res => res.json())
    .then()
  }

  return (
    <CloudinaryContext cloudName='duy4yg4hz'>
      <div >
        <button id="addPicture" className="button is-link" onClick={() => widgetRef.current.open()}>
          Upload a Picture of the Finished Product
        </button>

        {uploadedImage && (
          <div>
            <h3 className="inspHeader">Finished Product Picture</h3>
            <Image className="img" publicId={uploadedImage} width="300" height="300" />
          </div>
        )}
      </div>
    </CloudinaryContext>
  );
}

export default UploadWidget;
