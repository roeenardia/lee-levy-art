import React from 'react';
import Input from '../../FormElements/Input';
import Button from '../../FormElements/Button';
import { useForm } from '../../Hooks/Form-Hook';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../util/validators';


const Contatct = () => {

  const [formState, inputHandler] = useForm(
    {
      name:{
        value: '',
        isValid: false
      },
      email:{
        value: '',
        isValid: false
      },
      message:{
        value: '',
        isValid: false
      }
    },
    false
  );

  const contactSubmitHandler = (event) =>{
    event.preventDefault();
    console.log(formState.inputs); // ****** send to backend *******
  }

  return (
    <form onSubmit={contactSubmitHandler}>
      <Input 
      id="name"
      element="input"
      type="text"
      label="Your Name"
      validators={[VALIDATOR_REQUIRE]}
      errorText="please enter your name"
      onInput={inputHandler}/>

      <Input 
      id="email"
      element="input"
      type="email"
      label="Email"
      validators={[VALIDATOR_REQUIRE, VALIDATOR_EMAIL]}
      errorText="please enter valid Email"
      onInput={inputHandler}/>
      
      <Input 
      id="message"
      element="input"
      type="text"
      label="Message"
      validators={[VALIDATOR_REQUIRE]}
      errorText="please enter valid Message"
      onInput={inputHandler}/>

      <Button type="submit" disabled={!formState.isValid}>Send Message</Button>
    </form>
  )
}

export default Contatct