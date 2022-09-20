import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();
  console.log(file);

  useEffect(() => {
    if (!file) {
      return;
    }
    if (props.multiple) {
      return;
      // file.map((f) => {
      //   const fileReader = new FileReader();
      //   fileReader.onload = () => {
      //     setPreviewUrl(fileReader.result);
      //     //console.log(fileReader.result)
      //   };
      //   fileReader.readAsDataURL(f);
      // });
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
        //console.log(fileReader.result)
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const pickedHandler = (event) => {
    event.preventDefault();
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length !== 0) {
      pickedFile = props.multiple ? event.target.files : event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
        multiple={props.multiple}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
        {!isValid && <p>{props.errorText}</p>}
      </div>
    </div>
  );
};

export default ImageUpload;
