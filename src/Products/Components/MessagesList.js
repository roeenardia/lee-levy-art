import React from "react";
import MessageItem from "./MessageItem";
import "./MessageItem.css";

function MessagesList(props) {
  return (
    <div className="messages-list">
      {props.items.map((message) => {
        return (
          <MessageItem
            key={message.id}
            id={message.id}
            name={message.name}
            email={message.email}
            message={message.message}
          />
        );
      })}
    </div>
  );
}

export default MessagesList;
