import React from 'react'
import { useRef } from 'react';

function ChatForm({chatHistory, setChatHistory, generateBotResponse}) {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return; // Prevent sending empty messages
    console.log('User message:', userMessage);
    inputRef.current.value = "";
    // Update the chat history with the new user message
    setChatHistory(history => [...history, {role: "user", text: userMessage}]);

    
    // Call the function to generate a bot response based on the user's message
    generateBotResponse([...chatHistory, {role: "user", text: userMessage}]);
    
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input ref={inputRef} type="text" placeholder="Type your message..." className="message-input" required/>
        <button className='material-symbols-outlined'>arrow_upward</button>
    </form>
  )
}

export default ChatForm 