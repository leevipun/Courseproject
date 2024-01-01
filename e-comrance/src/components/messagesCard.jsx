import React, { useState } from "react";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import {
  appendMessage,
  initializeMessage,
  setMessages,
} from "../../reducer/messageReducer.js";
import {
  deleteMessage,
  editMessage,
  getAllMessages,
  sendMessage,
} from "../services/Services.js";
import { useSelector } from "react-redux";
import Spinner from "./LoadSpinner.jsx";

const MessagesCard = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [editMessageContent, setEditMessageContet] = useState("");
  const [editId, setEditId] = useState();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  let user = useSelector((state) => state.user);
  let messages = useSelector((state) => state.messages);

  const handleMessageDelete = async (messageId) => {
    try {
      setLoading(true);
      await deleteMessage(messageId);
      dispatch(initializeMessage(id));
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id, content) => {
    console.log(content);
    setEditMessageContet(content);
    console.log(id);
    setEditId(id);
    setEdit((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const newObject = {
        content: editMessageContent,
      };
      await editMessage(newObject, editId);
      dispatch(initializeMessage(id));
      setEdit(false);
      setEditId("");
      setEditMessageContet("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const pathSegments = window.location.pathname.split("/");

  const id = pathSegments[2] === "chats" ? pathSegments[3] : pathSegments[2];

  const getMessages = async () => {
    try {
      setLoading(true);
      const response = await getAllMessages(id);
      console.log("response", response);
      dispatch(setMessages(response.messages));
    } catch (error) {
      console.error("Error retrieving messages:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleMessageSending = async () => {
    try {
      if (message.length === 0) {
        return;
      } else {
        setLoading(true);
        const newObject = {
          sender: `${user.firstname} ${user.lastname}`,
          senderId: user.id,
          content: message,
        };
        console.log("newObject", newObject);

        const response = await sendMessage(newObject, id);

        console.log("response", response);
        // Use the callback function with the previous state to ensure correctness
        dispatch(appendMessage(response.message));
        console.log("message sent");

        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setEditId("");
    setEditMessageContet("");
  };

  return (
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
                    {edit ? (
                      editId === message.id ? (
                        <div>
                          <Input
                            value={editMessageContent}
                            onChange={(e) =>
                              setEditMessageContet(e.target.value)
                            }
                          />
                          <Button
                            style={{ marginRight: 5 }}
                            type="primary"
                            onClick={() => handleSave(message.id)}
                          >
                            Save
                          </Button>
                          <Button type="primary" onClick={() => handleCancel()}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <>
                            <p className="message-content">{message.content}</p>
                            <p className="message-sender">{message.sender}</p>
                            <p className="message-date">{message.date}</p>
                          </>
                          <Button
                            type="primary"
                            onClick={() =>
                              handleEdit(message.id, message.content)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            type="primary"
                            onClick={() => handleMessageDelete(message.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )
                    ) : (
                      <div>
                        <>
                          <p className="message-content">{message.content}</p>
                          <p className="message-sender">{message.sender}</p>
                          <p className="message-date">{message.date}</p>
                        </>
                        <Button
                          type="primary"
                          onClick={() =>
                            handleEdit(message.id, message.content)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => handleMessageDelete(message.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Spinner loading={loading} />
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
  );
};

export default MessagesCard;
