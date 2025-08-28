import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import AddCallIcon from "@mui/icons-material/AddCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUser from "../../Components/SearchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChat } from "../../Redux/Message/message.action";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { uploadToCloudinary } from "../../utils/uploadToCloudniry";
import SockJS from "sockjs-client";
import Stom from "stompjs";
import Stomp from "stompjs"; 
import { Link } from "react-router-dom";

const Message = () => {
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllChat());
  }, []);

  console.log("chats -------", message.chats);

  const handleSelectImage = async (e) => {
    setLoading(true);
    console.log("handle select Image...");
    const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imgUrl);
    setLoading(false);
  };

  const handleCreateMessage = (value) => {
    const message = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
    };
    dispatch(createMessage({ message, sendMessageToServer }));
  };

  useEffect(() => {
    setMessages([...messages, message.message]);
  }, [message.message]);

  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const sock = new SockJS("http://localhost:9090/ws");
    const stomp = Stom.over(sock);
    setStompClient(stomp);

    stomp.connect({}, onConnect, onErr);
  }, []);

  const onConnect = () => {
    console.log("websocket connected....");
  };

  const onErr = (error) => {
    console.log("errr", error);
  };

  useEffect(() => {
    if (stompClient && auth.user && currentChat) {
      const subscription = stompClient.subscribe(
        `/user/${currentChat.id}/private`,
        onMessageReice
      );
    }
  });

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/chat/${currentChat?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };

  const onMessageReice = (newMessage) => {
   console.log("message revice from webspcket ", newMessage);
  };

  return (
    <div>
      <div>
        <Grid container className="h-screen overflow-y-hidden">
          <Grid className="w-[25%] px-5 " item xs={3}>
            <div className="flex h-full justify-between space-x-2">
              <div className="w-full">
                <div className="flex space-x-4 items-center py-5">
                  <Link to="/home" className="flex items-center space-x-4">
                    <WestIcon />
                  </Link>
                  <h1 className="text-xl font-bold">Home</h1>   
                </div>

                <div className="h-[83vh] ">
                  <div className="">
                    <SearchUser />
                  </div>

                  <div className="h-full w-full space-y-4 mt-5  overflow-y-scroll hideScrolbar  ">
                    {message.chats.map((item) => {
                      return (
                        <div className="w-full"
                          onClick={() => {
                            setCurrentChat(item);
                            setMessages(item.messages);
                          }}
                        >
                          <UserChatCard chat={item} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          <Grid className="h-full w-[75%]" item xs={9}>
            {currentChat ? (
              <div>
                <div className="flex justify-between items-center border-1 p-5">
                  <div className="flex items-center space-x-3">
                    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZuDsEhf19DEEqUU8IzgIR-ow9hdCYrN0BkQ&s" />
                    <p>
                      {auth.user?.id === currentChat.users[0]?.id
                        ? currentChat.users[1].firstName +
                          " " +
                          currentChat.users[1].lastName
                        : currentChat.users[0].firstName +
                          " " +
                          currentChat.users[0].lastName}
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <IconButton>
                      <AddCallIcon />
                    </IconButton>

                    <IconButton>
                      <VideoCallIcon />
                    </IconButton>
                  </div>
                </div>

                <div className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5">
                  {messages.map((item) => (
                    <ChatMessage item={item} />
                  ))}

                  <div className="sticky bottom-0 border-1">
                    {selectedImage && (
                      <img
                        className="w-[5rem] h-[5rem] object-cover px-2"
                        src={selectedImage}
                        alt=""
                      />
                    )}
                    <div className=" flex items-center justify-center space-x-5">
                      <input
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && e.target.value) {
                            handleCreateMessage(e.target.value);
                            setSelectedImage("");
                          }
                        }}
                        className="bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5"
                        placeholder="Type message..."
                        type="text"
                      />
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSelectImage}
                          className="hidden"
                          id="image-input"
                        />
                        <label htmlFor="image-input">
                          <AddPhotoAlternateIcon />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full space-y-5 flex flex-col justify-center items-center">
                <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
                <p className="text-xl font-semibold">No Chat Selected</p>
              </div>
            )}
          </Grid>
        </Grid>

        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
};

export default Message;
