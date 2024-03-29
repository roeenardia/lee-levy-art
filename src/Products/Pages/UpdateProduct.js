import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ProductsData } from "../../ProductsData";
import Input from "../../Shared/FormElements/Input";
import Button from "../../Shared/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_FILE,
} from "../../Shared/util/validators";
import { useForm } from "../../Shared/Hooks/Form-Hook";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import LoadingSpinner from "../../Shared/UIElements/LoadingSpinner";
import "./UpdateProduct.css";

const UpdateProduct = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProduct, setLoadedProduct] = useState();
  const history = useHistory();
  let { id } = useParams();
  const [formState, inputHandler, setFormData] = useForm(
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
    },
    false
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/product/${id}`
        );
        setLoadedProduct(responseData.product);
        setFormData(
          {
            name: {
              value: responseData.product.name,
              isValid: true,
            },
            price: {
              value: responseData.product.price,
              isValid: true,
            },
            image: {
              value: responseData.product.image,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchProduct();
  }, [sendRequest, id, setFormData]);

  const productUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/product/${id}`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          price: formState.inputs.price.value,
          image: formState.inputs.image.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedProduct && !error) {
    return (
      <div>
        <h2>Could not find product</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <form onSubmit={productUpdateSubmitHandler} className="product-form">
        <div className="updateImageProduct">
          <img src={loadedProduct.image.url} />
        </div>

        <Input
          id="name"
          element="input"
          type="text"
          label="שם מוצר"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
          initialVlaue={formState.inputs.name.value}
          initialValid={formState.inputs.name.isValid}
        />

        <Input
          id="price"
          element="input"
          type="number"
          label="מחיר מוצר"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid price."
          onInput={inputHandler}
          initialVlaue={formState.inputs.price.value}
          initialValid={formState.inputs.price.isValid}
        />

        <Button type="submit" disabled={!formState.isValid}>
          עדכן מוצר
        </Button>
      </form>
    </React.Fragment>
  );
};

export default UpdateProduct;
