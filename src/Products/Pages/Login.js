import React from 'react';
import Input from '../../Shared/FormElements/Input';
import Button from '../../Shared/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import { useForm } from '../../Shared/Hooks/Form-Hook';
import { useState, useContext } from 'react';
import { AuthContext } from '../../Shared/Context/auth-context';
import { Link, Redirect } from 'react-router-dom';

//const adminUser = {userName: 'roeen', password: 'roee123'}

const Login = () => {

    const auth = useContext(AuthContext);

    const [formState, inputHandler] = useForm ({
        userName:{
            value: '',
            isValid: false
        },
        password:{
            value: '',
            isValid: false
        }
    }, false);



    const loginSubmitHandler = (event) =>{
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();       
    }

  return (
    <div>
        <h2>Login</h2>
        <hr />
        <form onSubmit={loginSubmitHandler}>
            <Input 
            id="userName"
            element="input"
            type="text"
            label="User name"
            validators={[VALIDATOR_REQUIRE]}
            errorText="please enter a valid user name."
            onInput={inputHandler}
            />

            <Input 
            id="password"
            element="input"
            type="text"
            label="Password"
            validators={[VALIDATOR_REQUIRE]}
            errorText="please enter a valid password."
            onInput={inputHandler}
            />

            <Button type="submit" disabled={!formState.isValid}>LOGIN</Button>
        </form>
    </div>
  )
}

export default Login