import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../FormElements/Input";
import Button from "../../FormElements/Button";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import { useForm } from "../../Hooks/Form-Hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../util/validators";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contatct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      message: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const delayFunc = async () => {
    await delay(2000);
  };

  const messageSent = () =>
    toast.success("הודעה נמסרה בהצלחה", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const dateFormat = () => {
    let date, month, year;
    date = new Date().getDate();
    month = new Date().getMonth() + 1;
    year = new Date().getFullYear();

    date = date.toString().padStart(2, "0");
    month = month.toString().padStart(2, "0");
    return `${date}/${month}/${year}`;
  };

  const history = useHistory();

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_LLA",
        "template_28xv0vd",
        event.target,
        "FJJ5k4WW9wR1MZHvy"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const contactSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          message: formState.inputs.message.value,
          messageDate: dateFormat(),
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      messageSent(onclick);
      await delayFunc();
      sendEmail(event);
      setIsLoading(false);
      history.push("/");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.message || "Something went wrong, please try again");
      //messageSent(onclick);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={contactSubmitHandler} className="contact-form">
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          name="name"
          label="שם"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2)]}
          errorText="הכנס שם, 2 אותיות לפחות"
          onInput={inputHandler}
        />

        <Input
          id="email"
          element="input"
          type="email"
          name="email"
          label="מייל"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="הכנס מייל תקין"
          onInput={inputHandler}
        />

        <Input
          id="message"
          element="textarea"
          type="text"
          name="message"
          label="הודעה"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
          errorText="כתוב הודעה, לפחות 10 תווים"
          onInput={inputHandler}
        />

        <Button
          type="submit"
          disabled={!formState.isValid}
          onSubmit={() => messageSent()}
        >
          שלח הודעה
          <ToastContainer />
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Contatct;
