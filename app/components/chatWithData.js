'use client';

import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';
import { useRef, useEffect, useState } from 'react';
import { FiMic, FiSend, FiVolume2, FiVolume } from 'react-icons/fi';

const ChatMessage = ({ content, handlePlayMessage }) => {
  return (
    <div className="message-content flex items-center">
      <ReactMarkdown className="flex-grow">{content}</ReactMarkdown>
      <button
        onClick={handlePlayMessage}
        className="ml-2 text-gray-500 hover:text-gray-800 transition"
        aria-label="Play message"
      >
        <FiVolume size={20} />
      </button>
    </div>
  );
};

const Chat = () => {
  const [selectedApi, setSelectedApi] = useState('/api/openai');
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: selectedApi,
  });

  const chatContainer = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const recordingTimeout = useRef(null); // Ref to store timeout ID

  // Play the entire chat
  const handlePlayChat = () => {
    const chatText = messages.map((message) => message.content).join('. ');
    const utterance = new SpeechSynthesisUtterance(chatText);
    window.speechSynthesis.speak(utterance);
  };

  // Play individual message
  const handlePlayMessage = (messageContent) => {
    const utterance = new SpeechSynthesisUtterance(messageContent);
    window.speechSynthesis.speak(utterance);
  };

  // Audio recording setup
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let chunks = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        // Create FormData to send the audio file
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.wav'); // Append the Blob with a name
        
        fetch('/api/audio-transcription', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Response from server:', data);
            // Do something with the response data
          })
          .catch((error) => {
            console.error('Error:', error);
            // Handle the error
          });
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);

      // Automatically stop recording after 2 minutes
      recordingTimeout.current = setTimeout(() => {
        if (recorder.state === 'recording') {
          stopRecording();
        }
      }, 2 * 60 * 1000); // 2 minutes in milliseconds
    } catch (err) {
      console.error('Error starting recording:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
    setIsRecording(false);
    clearTimeout(recordingTimeout.current); // Clear the timeout when recording stops
  };

  const scroll = () => {
    if (chatContainer.current) {
      chatContainer.current.scrollTo(0, chatContainer.current.scrollHeight);
    }
  };

  useEffect(() => {
    scroll();
  }, [messages]);

  const renderResponse = () => {
    return (
      <div className="response">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`chat-line ${
              message.role === 'user' ? 'user-chat' : 'ai-chat'
            } flex items-start mb-4`}
          >
            <div className="flex items-center">
              <div
                className={`p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-gray-300 text-gray-900'
                } flex-grow`}
                style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}
              >
                <ChatMessage
                  content={message.content}
                  handlePlayMessage={() => handlePlayMessage(message.content)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="chat flex flex-col h-full bg-gray-50 border border-gray-200 rounded-xl shadow-2xl">
      {messages.length > 0 && (
        <div className="play-chat-button p-4 text-center">
          <button
            onClick={handlePlayChat}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition flex items-center gap-2"
          >
            <FiVolume2 size={18} />
            Play Entire Chat
          </button>
        </div>
      )}

      <div
        ref={chatContainer}
        className="flex-grow p-6 overflow-y-auto bg-gradient-to-b from-gray-100 to-white rounded-t-xl"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {messages.length > 0 ? (
          renderResponse()
        ) : (
          <div className="text-center text-gray-400 mt-10 italic">
            Start a conversation by typing below...
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="chat-form flex items-center bg-gray-200 p-3 rounded-full mx-4 mb-4"
      >
        <input
          name="input-field"
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e)}
          placeholder="Type your message..."
          className="flex-grow bg-transparent border-none text-gray-800 placeholder-gray-500 focus:outline-none px-3"
          autoComplete="off"
        />
        <button
          onClick={isRecording ? stopRecording : startRecording}
          type="button"
          className={`relative ${
            isRecording ? 'text-red-500' : 'text-gray-500'
          } hover:text-red-700 transition`}
          aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
        >
          <FiMic size={24} />
          {isRecording && (
            <span className="absolute inset-0 rounded-full animate-ping bg-red-300 opacity-75"></span>
          )}
        </button>
        <button
          type="submit"
          className="ml-4 text-blue-500 hover:text-blue-700 transition"
          aria-label="Send Message"
        >
          <FiSend size={24} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
