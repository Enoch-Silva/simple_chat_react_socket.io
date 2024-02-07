import { useState } from "react";
import { Wrapper } from "./styles/Wrapper.style";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

function App() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [socket, setSocket] = useState(null);

  return (
    <>
      <Wrapper>
        <div className="App">
          {chatVisibility ? (
            <Chat socket={socket}></Chat>
          ) : (
            <Join
              setSocket={setSocket}
              setChatVisibility={setChatVisibility}
            ></Join>
          )}
        </div>
      </Wrapper>
    </>
  );
}

export default App;
