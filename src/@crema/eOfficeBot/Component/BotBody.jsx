import React, { useContext } from "react";
import { BotContext } from "../BotContext";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";

const BotBody = (props) => {
  const { screenShot } = props;
  const { messages } = useContext(BotContext);

  return (
    <div className={screenShot ? "hide-messages" : "show-messages"}>
      {messages.map((item, index) => {
        return item.component;
      })}
    </div>
  );
};

export default BotBody;


// import React, { useContext, useEffect, useRef } from "react";
// import { BotContext } from "../BotContext";
// import BotMessage from "./BotMessage";
// import UserMessage from "./UserMessage";

// const BotBody = () => {
//   const { messages } = useContext(BotContext);
//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   };

//   return (
//     <div ref={chatContainerRef} className="chat-container">
//       {messages.map((message) => {
//         return (
//           <div key={message.uuid} className="message">
//             {message.isBot ? (
//               <BotMessage message={message.message} />
//             ) : (
//               <UserMessage message={message.message} />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default BotBody;



// import React, { useContext, useEffect, useRef } from "react";
// import { BotContext } from "../BotContext";
// import BotMessage from "./BotMessage";
// import UserMessage from "./UserMessage";

// const BotBody = () => {
//   const { messages } = useContext(BotContext);
//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   };

//   return (
//     <div ref={chatContainerRef} className="chat-container">
//       {messages.map((message) => {
//         return (
//           <div key={message.uuid} className="message">
//             {message.component}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default BotBody;

