import React from 'react';
import {useContext, useState, useEffect} from 'react';
import { link } from 'react-router-dom';
import { AuthContext } from '../../Shared/Context/auth-context';
import LoadingSpinner from '../../Shared/UIElements/LoadingSpinner';
import './MessageItem.css';


function MessageItem(props) {
    
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

  return (
    <React.Fragment>       
            <div className='message-item'>
            <div className='message-item_content'>
                {isLoading && <LoadingSpinner asOverlay/>}
                <div className='message-item_info'>
                    <h3>Name: {props.name}</h3>
                    <h3>Email: {props.email}</h3>
                    <h3>Message: {props.message}</h3>
                </div>
            </div>
        </div> 
    </React.Fragment>
    
    
  )
}

export default MessageItem