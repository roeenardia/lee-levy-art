import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../Shared/Hooks/Form-Hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAX,
  VALIDATOR_MIN,
} from "../Shared/util/validators";
import Input from "../Shared/FormElements/Input";
import Button from "../Shared/FormElements/Button";
import LoadingSpinner from "../Shared/UIElements/LoadingSpinner";
import secureLocalStorage from "react-secure-storage";
import { ToastContainer, toast } from "react-toastify";
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

  const generateOrderNumber = () => {
    var orderNumber = Date.now();
    orderNumber = orderNumber.toString();
    let newNum = orderNumber.slice(0, -3);
    return newNum;
  };

  const checkedOut = () =>
    toast.success("הזמנתך נקלטה בהצלחה", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const delayFunc = async () => {
    await delay(2000);
  };

  const sendEmail = (event) => {
    event.preventDefault();

    const data = {
      service_id: "service_LLA",
      template_id: "template_pajad5i",
      user_id: "FJJ5k4WW9wR1MZHvy",
      template_params: {
        orderNumber: generateOrderNumber(),
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
      },
    };

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(
      (result) => {
        console.log(result.statusText);
      },
      (error) => {
        console.log(error.statusText);
      }
    );

    event.target.reset();
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
          orderNumber: generateOrderNumber(),
          orderDate: dateFormat(),
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      sendEmail(event);
      secureLocalStorage.removeItem("cart");
      checkedOut(onclick);
      await delayFunc();
      setIsLoading(false);
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
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          name="name"
          label="*שם מלא"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="הכנס שם בבקשה"
          onInput={inputHandler}
        />

        <Input
          id="email"
          element="input"
          type="email"
          label="*מייל"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="כתובת מייל לא תקינה"
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
          errorText="מספר כרטיס אשראי לא תקין"
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
              VALIDATOR_MAX(12),
              VALIDATOR_MIN(1),
            ]}
            errorText="הכנס חודש תקין"
            onInput={inputHandler}
          />
          <Input
            id="year"
            element="input"
            type="year"
            label="*שנה"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MAXLENGTH(2),
              VALIDATOR_MINLENGTH(2),
              VALIDATOR_MAX(28),
              VALIDATOR_MIN(24),
            ]}
            errorText="הכנס שנה תקינה"
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
          errorText="הכנס 3 ספרות בגב הכרטיס"
          onInput={inputHandler}
        />

        <h2 style={{ textAlign: "center" }}>₪{sum} :סהכ לתשלום</h2>
        <Button
          type="submit"
          disabled={!formState.isValid}
          onSubmit={() => checkedOut()}
        >
          לתשלום
          <ToastContainer />
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Checkout;
