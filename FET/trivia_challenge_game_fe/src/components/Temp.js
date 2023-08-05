import React, { useState, useRef, useEffect } from 'react';
import { LexRuntime } from 'aws-sdk';
import awsConfig from './Config';

const LexChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const chatBoxRef = useRef(null);

  const lexRuntime = new LexRuntime(awsConfig);

  const handleUserInput = async (e) => {
    e.preventDefault();
  
    if (inputText.trim() === '') return;
  
    const sessionAttributes = {}; // Add session attributes if needed
    const params = {
      botAlias: 'YOUR_BOT_ALIAS',
      botName: 'YOUR_BOT_NAME',
      inputText,
      userId: 'UNIQUE_USER_ID', // A unique identifier for each user
      sessionAttributes,
    };
  
    try {
      const data = await lexRuntime.postText(params).promise();
      const responseMessage = data.message;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, fromUser: true },
        { text: responseMessage, fromUser: false },
      ]);
      setInputText('');
    } catch (error) {
      console.error('Error communicating with Lex:', error);
    }
  };
  

  // Scroll to the bottom of the chat box whenever new messages are added
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
}, [messages]);

  return (
    <div>
      <div className="h-64 overflow-y-auto p-4 border  " ref={chatBoxRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded ${
              message.fromUser ? 'bg-blue-200' : 'bg-green-200'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleUserInput} className="flex mt-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 p-2 border"
        />
        <button type="submit" className="px-4 py-2 ml-2 bg-blue-500 text-white">
          Send
        </button>
      </form>
    </div>
  );
};

export default LexChatComponent;
