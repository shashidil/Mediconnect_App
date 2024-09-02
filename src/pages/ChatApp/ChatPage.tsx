import React, { useEffect, useState } from 'react';
import { Layout, List, Typography, Spin, Col, Row, Card } from 'antd';
import { useLocation } from 'react-router-dom';
import WebSocketService from '../../services/api/WebSocketService';
import ChatWindow from '../../components/Chat/ChatWindow';
import axiosInstance from '../../services/axiosInstance';
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

  const handleItemClick = (chat: any) => {
    setSelectedChat(chat);
    handleChatSelect(chat);
  };

  return (
      <Card style={{ minHeight: '85vh' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1>Chat</h1>
          <hr style={{ border: '1px solid #ddd', margin: '8px 0' }} />
        </div>
        {loading ? (
            <div style={{ textAlign: 'center', padding: '50px', minHeight: '500px' }}>
              <Spin size="large" />
            </div>
        ) : (
            <Row gutter={24}>
              <Col span={6}>
                <h3>Chat list</h3>
                <List
                    dataSource={chats}
                    renderItem={(chat) => (
                        <List.Item
                            onClick={() => handleItemClick(chat)}
                            style={{
                              cursor: 'pointer',
                              backgroundColor: selectedChat === chat ? '#e6f7ff' : 'transparent', // Highlight selected item
                              fontWeight: selectedChat === chat ? 'bold' : 'normal', // Optional: make text bold
                              borderRadius: '7px',
                              padding: '5%',
                              border: '1px solid #dedcdc',
                              margin: '1%',
                            }}
                        >
                          <Text>{chat.name}</Text>
                        </List.Item>
                    )}
                />
              </Col>
              <Col span={18}>
                <Card style={{ padding: '0 24px' }}>
                  {selectedChat ? (
                      <>
                        <h3>{selectedChat.name}'s Chat</h3>
                        <ChatWindow chat={selectedChat} messages={messages} />
                      </>
                  ) : (
                      <div style={{ height: '50vh' }}>Select a chat to start messaging</div>
                  )}
                </Card>
              </Col>
            </Row>
        )}
      </Card>
  );
};

export default ChatPage;
