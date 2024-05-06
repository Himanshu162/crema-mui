import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import "./FriendChat.css";

const FriendChat = ({ friend, messages, onSendMessage, onGoBack }) => {
  const [messageInput, setMessageInput] = useState("");

  const handleMessageSend = () => {
    if (messageInput.trim() !== "") {
      onSendMessage(friend.id, messageInput);
      setMessageInput("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };

  const handleGoBack = () => {
    onGoBack();
  };

  return (
    <div className="friend-chat">
      <div className="friend-header">
        <button className="back-button" onClick={handleGoBack}>
          <KeyboardBackspaceIcon />
        </button>
        <Avatar src={friend.avatar} />
        <span className="friend-name">{friend.name}</span>
      </div>
      <div className="message-container">
        {messages.map((item, index) => (
          item.component
        ))}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={handleKeyPress} 
          placeholder="Type a message..."
          className="message-input"
        />
        <button onClick={handleMessageSend} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default FriendChat;

// import React, { useState, useEffect } from 'react';
// import { TextField, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, } from '@material-ui/core';
// import Stomp from 'stompjs';
// import SockJS from 'sockjs-client';

// const FriendChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [nickname, setNickname] = useState('');
//   const [stompClient, setStompClient] = useState(null);

//   useEffect(() => {
//     const socket = new SockJS('http://localhost:8080/ws');
//     //webscoket instance to enable communication b/w client and server side websocke endpoints
//     const client = Stomp.over(socket);//create a stomp client over socket connection
//     //stomp->msg protocol used with websocket for real ltime communication


//     //connect creates a connection with the server using client connection method
//     //empty object->any custom header to be send during connection inside connection callback
//     client.connect({}, () => {
//       client.subscribe('/topic/public', (message) => {//subscribe to the /topic/public destination on server side=> client is interested in recieveing messages published to this destination
//         //msg callback is used, executed when msg is recieved on subscribed destination

//         //message object represent recieved msg, which is parsed and state variable is updated 
//         const receivedMessage = JSON.parse(message.body);
//         setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//       });
//     });

//     setStompClient(client);

//     return () => {
//       client.disconnect();
//     };
//   }, []);

//   const handleNicknameChange = (event) => {
//     setNickname(event.target.value);
//   };

//   const handleMessageChange = (event) => {
//     setMessage(event.target.value);
//   };

//   const sendMessage = () => {
//     if (message.trim() && stompClient !== null && stompClient.connected) {
//       const chatMessage = {
//         nickname,
//         content: message,
//       };
  
//       stompClient.send('/app/chat.send', {}, JSON.stringify(chatMessage));
//       setMessage('');
//     }
//   };
  

//   return (
//     <div>
//       <List>
//         {messages.map((msg, index) => ( //map the message to display in chat window inside listitem
//           <ListItem key={index}>
//             <ListItemAvatar>
//               <Avatar>{msg.nickname.charAt(0)}</Avatar> {/*Avatar shows first letter of name*/}
//             </ListItemAvatar>
//             <ListItemText primary={
//               <Typography variant="subtitle1">{msg.nickname}</Typography>
//             }
//               secondary={msg.content}
//             />
//           </ListItem>
//         ))}
//       </List>

//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         {/*Textfield to enter Nickname and message and we use the value Nickname and msg from our state variables*/}
//         <TextField placeholder="Enter your nickname" value={nickname} onChange={handleNicknameChange} autoFocus />
//         <TextField placeholder="Type a message" value={message} onChange={handleMessageChange} fullWidth />
//         <IconButton onClick={sendMessage} disabled={!message.trim()}>send</IconButton>
//       </div>
//     </div>
//   );
// };

// export default FriendChat;