import React, { useState } from "react";
import { useForm } from "../Shared/Hooks/Form-Hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../Shared/util/validators";
import Input from "../Shared/FormElements/Input";
import Button from "../Shared/FormElements/Button";
import secureLocalStorage from "react-secure-storage";
import "./Checkout.css";

const Checkout = () => {
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
      idNumber: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  let sum = cartItems.reduce((value, object) => {
    return value + object.productPrice;
  }, 0);

  const CheckoutSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("product", cartItems.productPrice);
    // formData.append("name", formState.inputs.name.value);
    //console.log(formState.inputs);
    console.log(formData);
  };

  return (
    <React.Fragment>
      <h4 style={{ textAlign: "center" }}>כרגע כל ההזמנות הן איסוף עצמי</h4>
      <form className="checkout-form" onSubmit={CheckoutSubmitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
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

        <Input
          id="idNumber"
          element="input"
          type="number"
          label="*תעודת זהות"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MAXLENGTH(8),
            VALIDATOR_MINLENGTH(8),
          ]}
          errorText="Please enter valid id"
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
