import React, { useState } from 'react';
import { List, Input, Button, Typography } from 'antd';
import WebSocketService from '../../services/api/WebSocketService';

const { TextArea } = Input;
const { Text } = Typography;

interface ChatWindowProps {
  chat: { name: string; id: number };
  messages: { id: number; content: string; sender: { id: number; name: string }; receiver: { id: number; name: string } }[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, messages }) => {
  const [message, setMessage] = useState('');
  const loggedInUserId = parseInt(localStorage.getItem('userId') || '0', 10);

  const handleSendMessage = () => {
    const chatMessage = {
      senderId: loggedInUserId,
      receiverId: chat.id,
      content: message,
    };
    WebSocketService.sendMessage('/app/chat.sendMessage', chatMessage);
    setMessage('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Chat messages container */}
      <div
        style={{
          flexGrow: 1,
          padding: '16px',
          backgroundColor: '#f0f0f0',
          overflowY: 'auto',  // Enables vertical scrolling
          maxHeight: '70vh',  // Limit the height of the chat window
        }}
      >
        <List
          dataSource={messages}
          renderItem={(msg) => (
            <List.Item
              style={{
                display: 'flex',
                justifyContent: msg.sender.id === loggedInUserId ? 'flex-end' : 'flex-start',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  maxWidth: '60%',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: msg.sender.id === loggedInUserId ? '#d9f7be' : '#fff',
                  textAlign: msg.sender.id === loggedInUserId ? 'right' : 'left',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Text strong>{msg.sender.id === loggedInUserId ? 'You' : msg.sender.name}</Text>
                <div>{msg.content}</div>
              </div>
            </List.Item>
          )}
        />
      </div>

      {/* Message input area */}
      <div style={{ padding: '16px', backgroundColor: '#fff' }}>
        <TextArea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <Button
          type="primary"
          onClick={handleSendMessage}
          style={{ marginTop: '8px', float: 'right' }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;
