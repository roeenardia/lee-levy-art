import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../Shared/FormElements/Button";
import Input from "../../Shared/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../Shared/util/validators";
import { useForm } from "../../Shared/Hooks/Form-Hook";
import LoadingSpinner from "../../Shared/UIElements/LoadingSpinner";
import ImageUpload from "../../Shared/FormElements/ImageUpload";
import "./NewProduct.css";

const NewProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      image: {
        value: "",
        isValid: false,
      },
      photos: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const productSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("price", formState.inputs.price.value);
      formData.append("image", formState.inputs.image.value);
      for (const photo of formState.inputs.photos.value) {
        formData.append("photos", photo);
      }
      const response = await fetch("http://localhost:5000/new-product", {
        method: "POST",
        headers: {},
        body: formData,
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      history.push("/");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.message || "Somthing went wrong, Please try again");
      alert(err.message);
    }
  };

  return (
    <React.Fragment>
      <form className="product-form" onSubmit={productSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="שם מוצר"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a vaild name"
          onInput={inputHandler}
        />

        <Input
          id="price"
          element="input"
          type="number"
          label="מחיר מוצר"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a vaild price"
          onInput={inputHandler}
        />

        <ImageUpload
          id="image"
          name="image"
          onInput={inputHandler}
          errorText="בחר תמונה"
        />
        <ImageUpload
          id="photos"
          name="photos"
          onInput={inputHandler}
          errorText="בחר תמונה"
          multiple
        />

        <Button type="submit" disabled={!formState.isValid}>
          הוסף מוצר
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewProduct;
