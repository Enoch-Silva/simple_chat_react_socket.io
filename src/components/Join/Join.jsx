import { useRef } from "react";
import io from "socket.io-client";
import { BiMessageDots } from "react-icons/bi";
import "./Join.css";

const Join = ({ setChatVisibility, setSocket }) => {
  const usernameRef = useRef();

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return;
    const socket = await io.connect("https://simple-chat-tqoe.onrender.com");
    socket.emit("set_username", username);
    setSocket(socket);
    setChatVisibility(true);
  };

  const getEnterKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="loginContainer">
      <div className="logos">
        <BiMessageDots id="logo"></BiMessageDots>
        <h1 id="hOne">white</h1>
        <h1 id="hTwo">Chat.</h1>
      </div>
      <input
        type="text"
        id="userInput"
        ref={usernameRef}
        placeholder="Nome de usuario"
        onKeyDown={(e) => getEnterKey(e)}
      />
      <button id="logBtn" onClick={() => handleSubmit()}>
        Entrar
      </button>
    </div>
  );
};

export default Join;
