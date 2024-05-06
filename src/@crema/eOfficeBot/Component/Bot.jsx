// import { Avatar, IconButton, } from "@material-ui/core";
// import React, { useContext, useState } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { BotContext } from "../BotContext";
// import BotBody from "./BotBody";
// import BotInput from "./BotInput";
// import Draggable from "react-draggable";
// import ScreenShot from "./ScreenShot";
// import ScrollToBottom from "react-scroll-to-bottom";
// import botImage from './botimg.jpg';
// import "../Bot.css"
// import Button from '@mui/material/Button';

// const Bot = () => {
//   const { setopenBot, helpDesk, connected } = useContext(BotContext);

//   const [screenShot, setScreenShot] = useState("");
//   const [open, setOpen] = useState(false);

//   const handleScreenShot = (blob) => {
//     setScreenShot(blob);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setScreenShot("");
//     setOpen(false);
//   };

//   return (
//     <Draggable handle="#draggable-dialog-title-bot" cancel={".cancel-drag"}>
//       <div className="botContainer">
//         <div
//           className="botHeader"
//           aria-labelledby="draggable-dialog-title-bot"
//           id="draggable-dialog-title-bot"
//         >

//           {/* <Avatar
//             src={`${process.env.PUBLIC_URL}/assets/images/bot-logo.png`}
//           /> */}
//           <Avatar
//             src={botImage}

//           />
//           <div>
//             {/* <Button variant="contained" href="#contained-buttons">
//               Link
//             </Button> */}
//             <span
//               style={{
//                 fontSize: "1.5rem",
//                 color: "white",
//               }}
//             >
//               {helpDesk ? helpDesk : "ChatGenie"}
//             </span>
//             {connected ? (
//               <span
//                 style={{
//                   color: "#39ed07",
//                   fontWeight: "bolder",
//                 }}
//               >
//                 Online
//               </span>
//             ) : (
//               <span
//                 style={{
//                   color: "#ed071a",
//                   fontWeight: "bolder",
//                 }}
//               >
//                 Offline
//               </span>
//             )}
//           </div>
//           {/* <IconButton onClick={() => setopenBot(false)} className="cancel-drag">
//             <RxCross1 
//               style={{
//                 color: "white",
//               }}
//             />
//           </IconButton> */}
//         </div>

//         <div className="bot-body-inp-con">
//           <div className="botBody" id="botId">
//             <ScrollToBottom
//               className={`scroll-to-bottom ${screenShot ? "scroll-hide" : "scroll-show"
//                 }`}
//               mode="bottom"
//             >
//               <BotBody screenShot={screenShot} />
//             </ScrollToBottom>

//             <ScreenShot
//               screenShot={screenShot}
//               handleScreenShot={handleScreenShot}
//               handleClose={handleClose}
//             />
//           </div>

//           <div className="BotInput">
//             <BotInput
//               screenShot={screenShot}
//               handleScreenShot={handleScreenShot}
//               handleClose={handleClose}
//             />
//           </div>
//         </div>
//       </div>
//     </Draggable>
//   );
// };

// export default Bot;

import React, { useContext, useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import Draggable from "react-draggable";
import ScrollToBottom from "react-scroll-to-bottom";
import BotBody from "./BotBody";
import BotInput from "./BotInput";
import ScreenShot from "./ScreenShot";
import FriendChat from "./FriendChat";
import botImage from './botimg.jpg';
import "../Bot.css";
import { BotContext } from "../BotContext";
import P1 from './P1.webp';
import P2 from './p4.jpg';
import P3 from './p3.avif';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import axios from 'axios';
import "../ChatRoom.css"
import ChatRoom from './ChatRoom';

const Bot = () => {
  
  const { helpDesk,connected,selectedFriend, setSelectedFriend, friendMessages, setFriendMessages ,addUserMsg } = useContext(BotContext);
  const [screenShot, setScreenShot] = useState("");
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chatbot");
  const [searchQuery, setSearchQuery] = useState("");
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [currentFriend, setCurrentFriend] = useState(null); 
  const [showLoadMore, setShowLoadMore] = useState(false); 

  useEffect(() => {
    fetchFriendList();
  }, []);

  const fetchFriendList = async () => {
    try {
      const response = await fetch('https://65ded6c3ff5e305f32a098b0.mockapi.io/user-messages/friends');
      if (!response.ok) {
        throw new Error('Failed to fetch friend list');
      }
      const data = await response.json();
      setFriendList(data);
    } catch (error) {
      console.error('Error fetching friend list:', error);
    }
  };

  const handleScreenShot = (blob) => {
    setScreenShot(blob);
    setOpen(true);
  };

  
const handleSearch = (query) => {
  setSearchQuery(query);
  let filteredNames = [];

  if (query.length > 0) {
    filteredNames = friendList.filter((friend) =>
      friend.name.toLowerCase().startsWith(query.toLowerCase())
    );
  }
  setNameSuggestions(filteredNames.slice(0, 2));
  setShowLoadMore(filteredNames.length > 2); 
};

const handleLoadMore = () => {
  const currentSuggestions = nameSuggestions.slice(); 
  const remainingSuggestions = friendList.filter((friend) =>
    friend.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  ).slice(nameSuggestions.length, nameSuggestions.length + 2); 
  setNameSuggestions(currentSuggestions.concat(remainingSuggestions)); 
  setShowLoadMore(remainingSuggestions.length >=1); 
};

  const handleClose = () => {
    setScreenShot("");
    setOpen(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedFriend(null);
    if (tab === "friend") {
      fetchFriendList();
    }
  };

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    setSearchQuery(""); 
    setNameSuggestions([]); 
    const newCurrentFriend = { id: friend.id, name: friend.name }; 
    console.log("Current friend:", newCurrentFriend.name, "(ID:", newCurrentFriend.id + ")"); 
    setCurrentFriend(newCurrentFriend);
  };


  const handleSendMessageToFriend = (friendId, message) => {
    addUserMsg(message);
  };

  const onGoBack = () => {
    setSelectedFriend(null);
    setCurrentFriend(null); 
  };
  
  return (
    <Draggable handle="#draggable-dialog-title-bot" cancel={".cancel-drag"}>
      <div className="botContainer">
        <div className="botHeader" aria-labelledby="draggable-dialog-title-bot" id="draggable-dialog-title-bot">
          <Avatar src={botImage} />
          <div>
            <span style={{ fontSize: "1.5rem", color: "white" }}>{helpDesk ? helpDesk : "ChatGenie"}</span>
          </div>
        </div>

        <div className="tabContainer">
          <div className="tabButtons">
            <button
              className={activeTab === "chatbot" ? "active" : ""}
              onClick={() => handleTabChange("chatbot")}
            >
              Chatbot
            </button>
            <button
              className={activeTab === "friend" ? "active" : ""}
              onClick={() => handleTabChange("friend")}
            >
              Friends
            </button>
          </div>

          <div className="tabContent">
            {activeTab === "chatbot" && (
              <div className="bot-body-inp-con">
                <div className="botBody" id="botId">
                  <ScrollToBottom
                    className={`scroll-to-bottom ${screenShot ? "scroll-hide" : "scroll-show"}`}
                    mode="bottom"
                  >
                    <BotBody screenShot={screenShot} friend={selectedFriend} />
                  </ScrollToBottom>

                  <ScreenShot
                    screenShot={screenShot}
                    handleScreenShot={handleScreenShot}
                    handleClose={handleClose}
                  />
                </div>

                <div className="BotInput">
                  <BotInput
                    screenShot={screenShot}
                    handleScreenShot={handleScreenShot}
                    handleClose={handleClose}
                  />
                </div>
              </div>
            )}

            {activeTab === "friend" && (
              <div className="friend-tab-content">
                <ChatRoom />
                {/* {!selectedFriend && (
                  <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                )}

                {nameSuggestions.length > 0 && !selectedFriend && (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {nameSuggestions.map((friend) => (
                          <TableRow key={friend.id} onClick={() => handleFriendClick(friend)}>
                            <TableCell>{friend.name}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}


                {showLoadMore && (
                  <p onClick={handleLoadMore} style={{ cursor: "pointer" , color:"blue"}}>Load More</p>
                )}

                {selectedFriend ? (
                  <FriendChat
                    friend={selectedFriend}
                    messages={friendMessages}
                    onSendMessage={handleSendMessageToFriend}
                    onGoBack={onGoBack}
                  />
                ) : (
                  <div className="friend-list">
                    {friendList.map((friend) => (
                      <div className="friend-item" key={friend.id} onClick={() => handleFriendClick(friend)}>
                        <Avatar alt={friend.name} src={friend.avatar} />
                        <span className="friend-name">{friend.name}</span>
                      </div>
                    ))}
                  </div>
                )} */}
              </div>//
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Bot;



Bot.js
