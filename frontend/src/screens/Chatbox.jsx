import { useEffect, useRef, useState } from 'react'
import ChatMessage from '../chatbotComponents/ChatMessage'
import ChatForm from '../chatbotComponents/ChatForm'
import ChatbotIcon from '../chatbotComponents/ChatbotIcon'


function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !chatBodyRef.current) return;
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [chatHistory, isOpen]);

  const generateBotResponse = async (history) => {
    console.log('Generating bot response for history:', history);
    const userMessage = history[history.length - 1].text;
    history = history.map(({role, text}) => ({role, parts: [{text}]}));
    
    // Replace the temporary thinking message with the final bot response.
    const updateHistory = (text) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role: "model", text}]);
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/ask/', requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || 'Failed to generate bot response');
      console.log('Bot response data:', data);
      const apiResponseText = (data.reply || '').trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.error('Error generating bot response:', error);
    }
  };

  return (
    <div className='chatbot-container'>
      {isOpen ? (
        <div className='chatbot-popup'>
          <div className='chatbot-header'>
            <div className='header-info'>
              <ChatbotIcon />
              <h2 className='logo-text'>Assistant ₍ᐢ. .ᐢ₎</h2>
            </div>
            <button
              type='button'
              className='close-btn material-symbols-outlined'
              onClick={() => setIsOpen(false)}
              aria-label='Close chat'
              title='Close chat'
            >
              keyboard_arrow_down
            </button>
          </div>

          <div className='chat-body' ref={chatBodyRef}>
            <div className='message bot-message'>
              <ChatbotIcon />
              <p className='message-text'>Hello! How can I assist you today?</p>
            </div>

            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

        {/* Render the chat history dynamixally */}
          <div className="chat-footer">
            <ChatForm chatHistory={chatHistory}  setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
          </div>
        </div>
      ) : (
        <button className='chatbot-toggle-btn' onClick={() => setIsOpen(true)} title="Open Chat">
          <ChatbotIcon />
        </button>
      )}
    </div>
  )
}
export default Chatbox