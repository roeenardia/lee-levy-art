import React from 'react';
import {useEffect, useState} from 'react';
import MessagesList from './MessagesList';
import LoadingSpinner from '../../Shared/UIElements/LoadingSpinner';
import {useHttpClient} from '../../Shared/Hooks/http-hook';

function Messages(props) {
    const [loadedMessages, setLoadedMessages] = useState();
    const [isLoading, setIsLoading] = useState(false);
    //const [isLoading, error, sendRequest, clearError] = useHttpClient();

    useEffect(() => {
        const sendRequest = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5000/messages');
                const responseData = await response.json();
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setLoadedMessages(responseData.messages);
                setIsLoading(false);
            } catch (err) {
                
            }
        };
        sendRequest();
    }, []);

  return (
    <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay/>}
        {!isLoading && loadedMessages && <MessagesList items={loadedMessages}/>}
    </React.Fragment>
  )
}

export default Messages