import { useRef, useState, useEffect } from "react";
import "./Chat.css";
import style from "./Chat.module.css";

import { BiSolidSend } from "react-icons/bi";

const Chat = ({ socket }) => {
  const bottonRef = useRef();
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("received_message", (data) => {
      setMessageList((current) => [...current, data]);
    });
    return () => socket.off("received_message");
  }, [socket]);

  useEffect(() => {
    scrollDown();
  }, [messageList]);

  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;

    socket.emit("message", message);
    clearInput();
    focusInput();
  };

  const clearInput = () => {
    messageRef.current.value = "";
  };

  const focusInput = () => {
    messageRef.current.focus();
  };

  const getEnterKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const scrollDown = () => {
    bottonRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chatContainer">
      <div className="chatBody">
        {messageList.map((message, index) => (
          <div
            className={`${style["message-container"]} ${
              message.authorId === socket.id && style["message-mine"]
            }`}
            key={index}
          >
            <div className="messageAuthor">
              <strong>{message.author}</strong>
            </div>
            <div className="messageText">{message.text}</div>
          </div>
        ))}
      </div>
      <div ref={bottonRef}></div>
      <div className="chatFooter">
        <input
          type="text"
          id="messageInput"
          ref={messageRef}
          placeholder="Mensagem"
          onKeyDown={(e) => getEnterKey(e)}
        />
        <BiSolidSend id="sendBtn" onClick={() => handleSubmit()}></BiSolidSend>
      </div>
    </div>
  );
};

export default Chat;
