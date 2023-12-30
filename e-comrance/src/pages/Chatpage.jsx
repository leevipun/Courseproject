import React, { useState } from "react";
import { Input, Button, Select } from "antd";
import Spinner from "../components/LoadSpinner.jsx";
import {
  getAllChats,
  getAllMessages,
  getUserData,
  sendMessage,
} from "../services/Services.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addNotification } from "../../reducer/notificationReducer";
import { useDispatch } from "react-redux";
import "../styles/ChatPageStyles.css";
import { useSelector } from "react-redux";
import { appendMessage, setMessages } from "../../reducer/messageReducer";
import { initializeChats } from "../../reducer/ChatsReducer";
import Navbar from "../components/navbar.jsx";
import { initializeFollowers } from "../../reducer/followersReducer";

const Chatpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState([]);
  const messages = useSelector((state) => state.messages);
  const friends = useSelector((state) => state.friends);
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState("");

  let id = window.location.pathname.split("/")[2];

  document.title = "Chat";

  useEffect(() => {
    const fetchData = async () => {
      setSpinTip("Loading user listings...");
      try {
        setLoading(true);
        const user = JSON.parse(sessionStorage.getItem("loggedNoteappUser"));
        const response = await getUserData(user);
        console.log("Response", response);
        setUser(response);
        console.log("User", user);
        const id = window.location.pathname.split("/")[2];
        console.log("id", id);
        if (id) {
          const messages = await getAllMessages(id);
          console.log("messages", messages);
        }
        dispatch(initializeChats());
        getChats();
        dispatch(initializeFollowers());
        setLoading(false);
      } catch (error) {
        if (error.status === 401) {
          navigate("/login");
          dispatch(
            addNotification(
              "Please login first your session has expired so we can keep your favorites stored",
              "error"
            )
          );
        }
        setLoading(false);
        console.error("error", error);
      }
    };
    fetchData();
  }, []);

  const handleMessageSending = async () => {
    const newObject = {
      sender: `${user.firstname} ${user.lastname}`,
      senderId: user.id,
      content: message,
    };
    console.log("newObject", newObject);
    const id = window.location.pathname.split("/")[2];

    const response = await sendMessage(newObject, id);

    console.log("response", response);
    // Use the callback function with the previous state to ensure correctness
    dispatch(appendMessage(response.message));
    console.log("message sent");
    console.log(messages);

    setMessage("");
  };

  const selectOptions = () => {
    console.log("friends", friends);
    let data = [];
    friends.forEach((friend) => {
      data.push({ value: friend.id, label: friend.id });
    });
    setOptions(data);
  };

  const getMessages = async () => {
    const id = window.location.pathname.split("/")[2];
    const response = await getAllMessages(id);
    console.log("response", response);
    dispatch(setMessages(response.messages));
  };

  const getChats = async () => {
    const response = await getAllChats();
    console.log("response", response);
    setChats(response);
  };

  const handleRedirect = (id) => {
    if (window.location.pathname.split("/")[2] === id) {
      dispatch(addNotification("You are already in this chat", "error"));
      return;
    }

    navigate(`/chats/${id}`);
  };

  return (
    <div className="App">
      <Spinner loading={loading} tip={spinTip} />
      <Navbar />
      <div style={{ display: "flex" }}>
        <div id="chat-bar">
          <div id="chat">
            <h1>Chats</h1>
            <Button type="primary" onClick={getChats}>
              Get Chats
            </Button>
          </div>
          <div>
            <div>
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="message-container"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRedirect(chat.id)}
                >
                  <p className="chat-content">{`${chat.userNames[0]} + ${chat.userNames[1]}`}</p>
                  <p className="chat-date">{chat.lastMessage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="messages">
          {id ? (
            <div>
              <div>
                <div style={{ marginBottom: 10 }}>
                  <h1>Messages</h1>
                  <Button type="primary" onClick={() => getMessages()}>
                    Refresh
                  </Button>
                </div>
                <div className="container">
                  <div id="messages-section">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={
                          message.senderId === user.id
                            ? "message-container own-message-container"
                            : "message-container"
                        }
                      >
                        <p className="message-content">{message.content}</p>
                        <p className="message-sender">{message.sender}</p>
                        <p className="message-date">{message.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div id="inputDiv">
                <Input
                  style={{
                    width: 800,
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="primary" onClick={() => handleMessageSending()}>
                  Submit
                </Button>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <h1>No messages yet</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
