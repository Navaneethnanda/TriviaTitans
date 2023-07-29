import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Chatbot = ({chat, setChat}) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = (userType) => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: uuidv4(),
        text: inputValue,
        user: userType === "One" ? "User" : "bot"
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue('');
    }
  };

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className=" mx-auto p-4 bg-white rounded-lg mt-8 relative border-[1px] border-gray-300 shadow-md ">
    <div  className='bg-red-600 w-7 h-7 absolute top-4 right-4 rounded-full text-white text-lg font-bold text-center cursor-pointer' onClick={()=>{setChat(!chat)}}>X</div>
    <h1 className='text-center text-lg font-bold mb-4'>Help & FAQ</h1>
      <div className="border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto mb-4" ref={chatContainerRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 ${message.user === "User One" ? "text-left" : "text-right"} flex `}
          >
            <div
              className={`bg-gray-100 py-2 px-4 rounded-md max-w-[70%] text-sm  ${message.user === "User" ? "ml-auto" : "mr-auto"} `}
            >
              <span className="font-semibold block text-gray-900 text-left text-sm">{message.user}</span>
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
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage("One"); // For User One
            }
          }}
          className="flex-1 rounded-l-lg p-2 border border-gray-300 focus:outline-none text-sm "
        />
        <button
          onClick={() => handleSendMessage("One")} // For User One
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg px-4 py-2 ml-2 text-sm"
        >
          Send 
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
