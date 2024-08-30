import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export const MedicationReminder = (userId: string) => {
  const socket = new SockJS('http://localhost:8080/ws');
  const stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => {
      console.log(str);
    },
  });

  stompClient.onConnect = () => {
    console.log('Connected to WebSocket');

    // Subscribe to the user's notification queue
    //
    stompClient.subscribe(`/user/${userId}/queue/notifications`, (notification) => {
      const message = JSON.parse(notification.body);
    alert(`Reminder: ${message.message}`);
    console.log(`Reminder: ${message.message}`)
     message(`Reminder: ${message.message}`);
    });
  };
  stompClient.activate();

  return () => {
    if (stompClient) {
      stompClient.deactivate();
    }
  };
};
