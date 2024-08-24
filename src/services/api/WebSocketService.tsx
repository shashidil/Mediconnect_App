import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  private client: Client;

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });
  }

  connect(onMessageReceived: (msg: Message) => void) {
    this.client.onConnect = () => {
      this.client.subscribe('/user/queue/private-messages', onMessageReceived);
    };
    this.client.activate();
  }

  sendMessage(destination: string, body: any) {
    this.client.publish({ destination, body: JSON.stringify(body) });
  }

  disconnect() {
    if (this.client.connected) {
      this.client.deactivate(); // This will close the WebSocket connection
    }
  }

}

export default new WebSocketService();
