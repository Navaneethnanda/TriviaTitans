import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Chat = ({chat, setChat,id}) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef(null);
  const socketRef = useRef(null);
  const [connectionStatus,setConnectionStatus]=useState("submit");
  const [user,setUser]=useState();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {

    if (!(socketRef.current && socketRef.current.readyState === WebSocket.OPEN)) {
     handleConnect();
    }
   
    
    if (inputValue.trim() !== '') {
      

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        const message = {
          roomId: id,
          message: inputValue,
          action:"sendmessage",
          user:user?user:"anonymous"
        };
        socketRef.current.send(JSON.stringify(message));
      }

      setInputValue('');
    }
  };

  const handleConnect = () => {
    const socket = new WebSocket('wss://g6vyqz78f1.execute-api.us-east-1.amazonaws.com/dev?roomId=' + id);
    if (socketRef.current) {
      socketRef.current.close();
    }
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connection opened');

      setConnectionStatus("connected");
    };

    socket.onmessage = (event) => {
      // Received a message from the WebSocket server
      const message = JSON.parse(event.data);

     
        const newMessage = {
          id: uuidv4(),
          text: message["content"],
          user:message["user"]
        };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log('Received message:', messages);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');

      setConnectionStatus("submit");
    };

    socket.onerror = (error) => {

      setConnectionStatus("submit");
      console.error('WebSocket error:', error);
    };
  };

  useEffect(()=>{
    const username = localStorage.getItem('username');
    setUser(username?username:"");
  },[]);

  useEffect(() => {
    // Establish WebSocket connection when the component mounts
    handleConnect();

    // Close WebSocket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  },[]);



  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  const handleRoomPress=(e)=>{
    
    if (e.key === 'Enter') {
      handleConnect();
    }
  };

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg border-[1px] border-gray-300 shadow-md  mt-8 relative">
     {/*} <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Chat App</h2>
        <input className='border border-gray-300 rounded-lg px-1 py-2 focus:outline-none focus:border-blue-500 w-18 mr-4'
          value={roomid}
          onChange={(e) => { setRoomid(e.target.value); }} onKeyPress={handleRoomPress}
        />
        <button className='bg-blue-500 text-white p-2 rounded-md' onClick={handleConnect}>{connectionStatus}</button>
  </div>*/}
  <div  className='bg-red-600 w-7 h-7 absolute top-4 right-4 rounded-full text-white text-lg font-bold text-center cursor-pointer' onClick={()=>{setChat(!chat)}}>X</div>
  <h1 className='text-center text-lg font-bold mb-4'>Team chat</h1>  
  <div
        ref={chatContainerRef}
        className="border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto "
      >
        {messages.map((message) => (
          <div key={message.id} className="mb-2 flex ">
            <div className="bg-gray-300 py-2 px-4 rounded-3xl max-w-[85%] ml-auto p">
              <span className="font-semibold block text-gray-900 text-sm">{message.user}</span>
              <span className='text-sm'>{message.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-1 rounded-l-lg p-2 border border-gray-300 focus:outline-none text-sm"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg px-4 py-2 ml-2 text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
