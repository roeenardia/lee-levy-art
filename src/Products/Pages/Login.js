import React from "react";
import Input from "../../Shared/FormElements/Input";
import Button from "../../Shared/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../Shared/util/validators";
import { useForm } from "../../Shared/Hooks/Form-Hook";
import { useState, useContext } from "react";
import { AuthContext } from "../../Shared/Context/auth-context";
import secureLocalStorage from "react-secure-storage";
import LoadingSpinner from "../../Shared/UIElements/LoadingSpinner";
import "./Login.css";

//const adminUser = {userName: 'roeen', password: 'roee123'}

const Login = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formState, inputHandler] = useForm(
    {
      userName: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const loginSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formState.inputs.userName.value,
          password: formState.inputs.password.value,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      secureLocalStorage.setItem(
        "user",
        JSON.stringify({
          userName: formState.inputs.userName.value,
          password: formState.inputs.password.value,
        })
      );
      setIsLoading(false);
      auth.login();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.message || "Somthing went wrong, Please try again");
      alert(err.message);
    }
  };

  return (
    <React.Fragment>
      <div>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 style={{ textAlign: "center" }}>התחברות מנהל</h2>
        <span className="fade-line"></span>
        <form className="login-form" onSubmit={loginSubmitHandler}>
          <Input
            id="userName"
            element="input"
            type="text"
            label="שם משתמש"
            validators={[VALIDATOR_REQUIRE]}
            errorText="please enter a valid user name."
            onInput={inputHandler}
          />

          <Input
            id="password"
            element="input"
            type="text"
            label="סיסמא"
            validators={[VALIDATOR_REQUIRE]}
            errorText="please enter a valid password."
            onInput={inputHandler}
          />

          <Button type="submit" disabled={!formState.isValid}>
            התחברות
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
