// import React, { createContext, useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import BotMessage from "./Component/BotMessage";
// import UserMessage from "./Component/UserMessage";
// import SockJS from "sockjs-client";
// import { over } from "stompjs";


// export const BotContext = createContext();
// export const BotProvider = ({ children }) => {


//   let role = sessionStorage.getItem("role");

//   let uuid = uuidv4();
//   const initilMessage = {
//     uuid,
//     isBot: true,
//     component: (
//       <BotMessage
//         key={uuid}
//         uuid={uuid}
//         message="Hello What Can I Do For You"
//       />
//     ),
//   };

//   const [openBot, setopenBot] = useState(false);
//   const [messages, setmessages] = useState([initilMessage]);
//   const [lastQuery, setlastQuery] = useState({
//     text: "",
//     file: "",
//   });

//   const [stompClient, setStompClient] = useState("");
//   const [connected, setConnected] = useState(false);
//   const [helpDesk, setHelpDesk] = useState("");

//   useEffect(() => {
//     if (stompClient) {
//       stompClient.debug = null;
//       stompClient.connect({}, onConnected, onError);
//     } else {
//       connect();
//     }
//   }, [stompClient]);

//   // connecting to socket
//   const connect = async () => {
//     try {
//       let helpDesk = await (
//         await fetch(window.__ENV__.REACT_APP_GET_SUPPORT)
//       ).json();
//       let Sock = new SockJS(window.__ENV__.REACT_APP_CHAT_BOT);
//       let Client = over(Sock);
//       // setHelpDesk(helpDesk);
//       setHelpDesk("7wg.cad.cad");
//       setStompClient(Client);
//     } catch (error) {
//       // console.log(error);
//       callMessageOut("error", "An Error Occurred While Connecting To Helpdesk");
//     }
//   };

//   const onConnected = () => {
//     setConnected(true);
//     stompClient.subscribe(`/user/${role}/private`, onGetMessage);
//   };

//   const callMessageOut = (type, message) => {
//     console.log(type,message)
//     // dispatch(setSnackbar(true, type, message));
//   };

//   const onGetMessage = (payload) => {
//     let data = JSON.parse(payload.body);
//     addBotMsg(data.text, data.file, data.filename);
//   };

//   const onError = (err) => {
//     setConnected(false);
//     callMessageOut("error", "Lost Connection To Help Desk");
//   };

//   // in this useEffect based on userQuery either callApi for response from assistant and from socket
  // useEffect(() => {
  //   if (lastQuery.text || lastQuery.file) {
  //     const { text, file } = lastQuery;
  //     let chatMessage;

  //     if (file) {
  //       let reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onloadend = () => {
  //         const base64 = reader.result.split(",")[1];
  //         chatMessage = {
  //           sender: role,
  //           receiverName: helpDesk,
  //           text: text,
  //           file: base64,
  //         };
  //         send(chatMessage);
  //       };
  //     } else {
  //       chatMessage = {
  //         sender: role,
  //         receiverName: helpDesk,
  //         text: text,
  //         file: "",
  //       };
  //       send(chatMessage);
  //     }
  //   }
  // }, [lastQuery]);

//   const addBotMsg = (msg, blob, fileName) => {
//     let uuid = uuidv4();
//     let botMsg = {
//       uuid,
//       isBot: true,
//       component: (
//         <BotMessage
//           key={uuid}
//           uuid={uuid}
//           message={msg}
//           blob={blob}
//           fileName={fileName}
//         />
//       ),
//     };
//     setmessages((prevState) => [...prevState, botMsg]);
//   };

//   const addUserMsg = (msg, blob) => {
//     let uuid = uuidv4();
//     let userMsg = {
//       uuid,
//       isBot: false,
//       component: (
//         <UserMessage key={uuid} uuid={uuid} message={msg} blob={blob} />
//       ),
//     };
//     setmessages((prevState) => [...prevState, userMsg]);
//     setlastQuery({
//       text: msg,
//       file: blob,
//     });
//   };

//   const send = (body) => {
//     stompClient.send("/helpdesk/private-message", {}, JSON.stringify(body));
//     // stompClient.send("/app/chat.register", {}, JSON.stringify({sender:username,type:'JOIN'}));
//   };

//   return (
//     <BotContext.Provider
//       value={{
//         openBot,
//         setopenBot,
//         messages,
//         setmessages,
//         addBotMsg,
//         addUserMsg,
//         connected,
//         helpDesk,
//       }}
//     >
//       {children}
//     </BotContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import BotMessage from "./Component/BotMessage";
import UserMessage from "./Component/UserMessage";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


export const BotContext = createContext();
export const BotProvider = ({ children }) => {

  const [openBot, setopenBot] = useState(false);
  const [messages, setmessages] = useState([]);
  const [lastQuery, setlastQuery] = useState({
    text: "",
    file: "",
  });
  const [selectedFriend, setSelectedFriend] = useState("");
  const [friendMessages, setFriendMessages] = useState([])

  const receiveBotMessage = (msg, blob, fileName) => {
    const uuid = uuidv4();
    const botMsg = {
      uuid,
      isBot: true,
      component: (
        <BotMessage
          key={uuid}
          uuid={uuid}
          message={msg}
          blob={blob}
          fileName={fileName}
        />
      ),
    };
    setmessages((prevState) => [...prevState, botMsg]);
  };

  const sendUserMessage = (msg, blob) => {
    if (selectedFriend) {
      fetch("https://661526f42fc47b4cf27e2257.mockapi.io/friend-chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          friendId: selectedFriend.id,
          friendMessage: "This is a mock response from my friend.",
          userMessage: msg
        })
      }).then((res) => {
        console.log(res)
        fetchData2();
      })
    }
    else {
      fetch("https://65ded6c3ff5e305f32a098b0.mockapi.io/user-messages/user-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messageContent: msg,
          isUser: true,
          timestamp: new Date()
        })
      }).then((res) => {
        console.log(res)
        const uuid = uuidv4();
        const userMsg = {
          uuid,
          isBot: false,
          component: (
            <UserMessage key={uuid} uuid={uuid} message={msg} blob={blob} />
          ),
        };
        setmessages((prevState) => [...prevState, userMsg]);
        setlastQuery({
          text: msg,
          file: blob,
        });
      })
    }
  };

  const connectToBackend = async () => {
    const helpDesk = "ChatGenie";
    return helpDesk;
  };

  const sendMessageToBackend = (body) => {
    console.log("Message sent to backend:", body);

    fetch("https://65ded6c3ff5e305f32a098b0.mockapi.io/user-messages/user-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messageContent: "This is a mock response from the backend.",
        isUser: false,
        timestamp: new Date()
      })
    }).then((res) => {
      const responseData = {
        text: "This is a mock response from the backend.",
        file: "",
        filename: "",
      };

      receiveBotMessage(responseData.text, responseData.file, responseData.filename);
    })

  };

  useEffect(() => {
    connectToBackend().then((helpDesk) => {
      console.log("Connected to backend:", helpDesk);
    }).catch((error) => {
      console.error("Error connecting to backend:", error);
    });
  }, []);

  useEffect(() => {

    if (lastQuery.text || lastQuery.file) {
      sendMessageToBackend(lastQuery);
    }
  }, [lastQuery]);

  const contextValue = {
    friendMessages,
    setFriendMessages,
    selectedFriend,
    setSelectedFriend,
    openBot,
    setopenBot,
    messages,
    setmessages,
    addBotMsg: receiveBotMessage,
    addUserMsg: sendUserMessage,
    connected: true,
    helpDesk: "Chattify",
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://65ded6c3ff5e305f32a098b0.mockapi.io/user-messages/user-messages");
      if (response.ok) {
        const data = await response.json();
        renderMessages(data);
      } else {
        throw new Error("Failed to fetch messages from the mock API");
      }
    } catch (error) {
      console.error(error);

    }
  };

  const fetchData2 = async () => {
    console.log("h")
    try {
      const response = await fetch(`https://661526f42fc47b4cf27e2257.mockapi.io/friend-chats?friendId=${selectedFriend.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        renderMessages(data, true);
      } else {
        throw new Error("Failed to fetch messages from the mock API");
      }
    } catch (error) {
      console.error(error);

    }
  };

  useEffect(() => {

    if (selectedFriend) {

      fetchData2();
    }
    else {

      fetchData();
    }
  }, [selectedFriend]);

  const renderMessages = (data, isFriend) => {

    if (isFriend) {
      let tmpArr = []
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        let uuid1 = uuidv4()
        let uuid2 = uuidv4()
        let item = data[i]
        console.log({
          item
        })
        let userMessage = {
          uuid1,
          isBot: false,
          component: <UserMessage key={uuid1} uuid={uuid1} message={item.userMessage} />
        };
        let friendMessage = {
          uuid2,
          isBot: true,
          component: <BotMessage key={uuid2} uuid={uuid2} message={item.friendMessage} />
        }
        tmpArr.push(friendMessage)
        tmpArr.push(userMessage)
      }
      if (tmpArr.length > 0) {
        setFriendMessages(tmpArr)
      }
    }
    else {
      const formattedMessages = data.map((item) => {
        console.log(item);
        const uuid = uuidv4();
        if (item.isUser) {
          return {
            uuid,
            isBot: false,
            component: <UserMessage key={uuid} uuid={uuid} message={item.messageContent} />
          };
        } else {
          return {
            uuid,
            isBot: true,
            component: <BotMessage key={uuid} uuid={uuid} message={item.messageContent} />
          };
        }
      });
      setmessages(formattedMessages);
    }
  };

//   function connect(event) {
//     username = document.querySelector('#name').value.trim();

//     if(username) {
//         usernamePage.classList.add('hidden');
//         chatPage.classList.remove('hidden');

//         var socket = new SockJS('/ws');
//         stompClient = Stomp.over(socket);

//         stompClient.connect({}, onConnected, onError);
//     }
//     event.preventDefault();
// }


// function onConnected() {
//     // Subscribe to the Public Topic
//     stompClient.subscribe('/topic/public', onMessageReceived);

//     // Tell your username to the server
//     stompClient.send("/app/chat.register",
//         {},
//         JSON.stringify({sender: username, type: 'JOIN'})
//     )

//     connectingElement.classList.add('hidden');
// }


// function onError(error) {
//     connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
//     connectingElement.style.color = 'red';
// }



  return (
    <BotContext.Provider value={contextValue}>
      {children}
    </BotContext.Provider>
  );
};

// data = fetch("Get messages")
// data.map((item)=>{
//   if(item.isUser){
// return <UserMessage key={uuid} uuid={uuid} message={item.messageContent} blob={blob} />
//   }
//   else{
//     return
//     <BotMessage
//               key={uuid}
//               uuid={uuid}
//               message={msg}
//               blob={blob}
//               fileName={fileName}
//             />
//   }
// })
