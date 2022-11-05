import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../Shared/Hooks/Form-Hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../Shared/util/validators";
import Input from "../Shared/FormElements/Input";
import Button from "../Shared/FormElements/Button";
import LoadingSpinner from "../Shared/UIElements/LoadingSpinner";
import secureLocalStorage from "react-secure-storage";
import emailjs from "emailjs-com";
import "./Checkout.css";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  var [cartItems, SetCartItems] = useState(
    JSON.parse(secureLocalStorage.getItem("cart") || "[]")
  );

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      creditCard: {
        value: "",
        isValid: false,
      },
      year: {
        value: "",
        isValid: false,
      },
      month: {
        value: "",
        isValid: false,
      },
      cvv: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  let sum = cartItems.reduce((value, object) => {
    return value + object.productPrice;
  }, 0);

  let order = cartItems;

  const dateFormat = () => {
    let date, month, year;
    date = new Date().getDate();
    month = new Date().getMonth() + 1;
    year = new Date().getFullYear();

    date = date.toString().padStart(2, "0");
    month = month.toString().padStart(2, "0");
    return `${date}/${month}/${year}`;
  };

  const generateOrderNumber = () => {};

  const sendEmail = (event) => {
    event.preventDefault();

    const data = {};
  };

  const CheckoutSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          order: order,
          orderNumber: Math.floor(new Date().valueOf()),
          orderDate: dateFormat(),
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      sendEmail(event);
      secureLocalStorage.removeItem("cart");
      alert("הזמנה נשלחה בהצלחה");
      history.push("/");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.message || "Somthing went wrong, Please try again.");
      alert(err.message);
    }
  };

  return (
    <React.Fragment>
      <h4 style={{ textAlign: "center" }}>כרגע כל ההזמנות הן איסוף עצמי</h4>
      <form className="checkout-form" onSubmit={CheckoutSubmitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          name="name"
          label="*שם מלא"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a vaild name"
          onInput={inputHandler}
        />

        <Input
          id="email"
          element="input"
          type="email"
          label="*מייל"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid email address"
          onInput={inputHandler}
        />

        <Input
          id="creditCard"
          element="input"
          type="number"
          label="*מספר אשראי"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MAXLENGTH(16),
            VALIDATOR_MINLENGTH(16),
          ]}
          errorText="Please enter a valid Credit Card number"
          onInput={inputHandler}
        />

        <div className="year-month">
          <Input
            id="month"
            element="input"
            type="number"
            label="*חודש"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MAXLENGTH(2),
              VALIDATOR_MINLENGTH(2),
            ]}
            errorText="Please enter valid month"
            onInput={inputHandler}
          />
          <Input
            id="year"
            element="input"
            type="year"
            label="*שנה"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MAXLENGTH(4),
              VALIDATOR_MINLENGTH(4),
            ]}
            errorText="Please enter a valid year"
            onInput={inputHandler}
          />
        </div>

        <Input
          id="cvv"
          element="input"
          type="number"
          label="*cvv"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MAXLENGTH(3),
            VALIDATOR_MINLENGTH(3),
          ]}
          errorText="Please enter valid cvv"
          onInput={inputHandler}
        />

        <h2 style={{ textAlign: "center" }}>₪{sum} :סהכ לתשלום</h2>
        <Button type="submit" disabled={!formState.isValid}>
          לתשלום
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Checkout;
