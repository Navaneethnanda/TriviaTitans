import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef(null);
  const [roomid, setRoomid] = useState('');
  const socketRef = useRef(null);
  const [connectionStatus,setConnectionStatus]=useState("submit");
  
  const [user,setUser]=useState();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {

    if (!(socketRef.current && socketRef.current.readyState === WebSocket.OPEN)) {
      handleConnect();
    }
   
    
    if (inputValue.trim() !== '') {
      

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        const message = {
          roomId: roomid,
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
    const socket = new WebSocket('wss://g6vyqz78f1.execute-api.us-east-1.amazonaws.com/dev?roomId=' + roomid);
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
    const username = localStorage.getItem('user');
    setUser(username?username:"");
  },[]);

  useEffect(() => {
    // Establish WebSocket connection when the component mounts
  

    // Close WebSocket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [roomid]);



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
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Chat App</h2>
        <input className='border border-gray-300 rounded-lg px-1 py-2 focus:outline-none focus:border-blue-500 w-18 mr-4'
          value={roomid}
          onChange={(e) => { setRoomid(e.target.value); }} onKeyPress={handleRoomPress}
        />
        <button className='bg-blue-500 text-white p-2 rounded-md' onClick={handleConnect}>{connectionStatus}</button>
      </div>
      <div
        ref={chatContainerRef}
        className="border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto"
      >
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <div className="bg-gray-100 p-2 rounded-md max-w-[70%] ml-auto">
              <span className="font-semibold block text-gray-900">{message.user}</span>
              <span>{message.text}</span>
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
          className="flex-1 rounded-l-lg p-2 border border-gray-300 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg px-4 py-2 ml-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
