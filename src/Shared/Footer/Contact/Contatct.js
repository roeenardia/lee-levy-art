import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../FormElements/Input";
import Button from "../../FormElements/Button";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import { useForm } from "../../Hooks/Form-Hook";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../../util/validators";
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
      setIsLoading(false);
      alert("!הודעה נשלחה בהצלחה");
      sendEmail(event);
      history.push("/");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.message || "Something went wrong, please try again");
      alert(err.message);
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
          validators={[VALIDATOR_REQUIRE]}
          errorText="please enter your name"
          onInput={inputHandler}
        />

        <Input
          id="email"
          element="input"
          type="email"
          name="email"
          label="מייל"
          validators={[VALIDATOR_REQUIRE, VALIDATOR_EMAIL]}
          errorText="please enter valid Email"
          onInput={inputHandler}
        />

        <Input
          id="message"
          element="textarea"
          type="text"
          name="message"
          label="הודעה"
          validators={[VALIDATOR_REQUIRE]}
          errorText="please enter valid Message"
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          שלח הודעה
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Contatct;
