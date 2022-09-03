import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../FormElements/Input';
import Button from '../../FormElements/Button';
import LoadingSpinner from '../../UIElements/LoadingSpinner';
import { useForm } from '../../Hooks/Form-Hook';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../util/validators';


const Contatct = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
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

  const history = useHistory();

  const contactSubmitHandler = async (event) =>{
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/contact',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          message: formState.inputs.message.value
        })
      });
      const responseData = await response.json();
      if(!response.ok){
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      alert('!הודעה נשלחה בהצלחה');
      history.push('/');
    } catch (err) {
      console.log(err)
      setIsLoading(false);
      setError(err.message || 'Something went wrong, please try again');
      alert(err.message);
    }
  }

  return (
    <React.Fragment>
    <form onSubmit={contactSubmitHandler}>
      {isLoading && <LoadingSpinner asOverlay/>}
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
      element="textarea"
      type="text"
      label="Message"
      validators={[VALIDATOR_REQUIRE]}
      errorText="please enter valid Message"
      onInput={inputHandler}/>

      <Button type="submit" disabled={!formState.isValid}>Send Message</Button>
    </form>
    </React.Fragment>
  )
}

export default Contatct