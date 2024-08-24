import React, { useEffect, useState } from 'react';
import { Layout, List, Typography, Spin } from 'antd';
import { useLocation } from 'react-router-dom';
import WebSocketService from '../../services/api/WebSocketService';
import ChatWindow from '../../components/Chat/ChatWindow';
import axiosInstance from '../../services/axiosInstance';

const { Sider, Content } = Layout;
const { Text } = Typography;

interface ChatMessage {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  timestamp: string;
  sender: { id: number; name: string };
  receiver: { id: number; name: string };
}

interface ChatUser {
  id: number;
  name: string;
}

const ChatPage: React.FC = () => {
  const location = useLocation();
  const [chats, setChats] = useState<ChatUser[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadInitialChat = async () => {
      const initialChat = location.state as ChatUser | null;
      console.log('Initial chat:', initialChat);

      if (initialChat && initialChat.id) {
        await handleChatSelect(initialChat);
      }
    };

    loadInitialChat();
  }, [location.state]);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const userId = parseInt(localStorage.getItem('userId') || '0', 10);

        if (userId) {
          setLoading(true);
          const response = await axiosInstance.get<ChatUser[]>(`/api/chats?userId=${userId}`);
          setChats(response.data);
        }
      } catch (error) {
        console.error('Error fetching chat list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatList();

    WebSocketService.connect((msg) => {
      const newMessage: ChatMessage = JSON.parse(msg.body);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  const handleChatSelect = async (chat: ChatUser) => {
    try {
      setSelectedChat(chat);
      setLoading(true);
  
      const loggedInUserId = parseInt(localStorage.getItem('userId') || '0', 10);
      const receiverId = chat.id;
  
      if (loggedInUserId && receiverId) {
        const response = await axiosInstance.get<ChatMessage[]>(
          `/api/chats/messages?senderId=${loggedInUserId}&receiverId=${receiverId}`
        );
  
        const messages = response.data.map(msg => ({
          ...msg,
          sender: {
            id: msg.sender.id,
            name: msg.sender.name,
          },
          receiver: {
            id: msg.receiver.id,
            name: msg.receiver.name,
          }
        }));
  
        setMessages(messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  return (
    <Layout style={{ height: '100vh' }}>
    <Sider width={300} style={{ background: '#fff' }}>
      <Spin spinning={loading} tip="Loading...">
        <List
          dataSource={chats}
          renderItem={(chat) => (
            <List.Item onClick={() => handleChatSelect(chat)}>
              <Text>{chat.name}</Text>
            </List.Item>
          )}
        />
      </Spin>
    </Sider>
    <Content style={{ padding: '0 24px' }}>
      {selectedChat ? (
        <ChatWindow chat={selectedChat} messages={messages} />
      ) : (
        <div>Select a chat to start messaging</div>
      )}
    </Content>
  </Layout>
  );
};

export default ChatPage;
