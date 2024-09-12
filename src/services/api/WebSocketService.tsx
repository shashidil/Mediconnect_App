import { Client, Message } from '@stomp/stompjs';

class WebSocketService {
  private client: Client;
  private userId: string | null = localStorage.getItem('userId');

  constructor() {
    this.client = new Client({
      brokerURL: `ws://localhost:8080/ws${this.userId ? `?userId=${this.userId}` : ""}`, // Append userId if present
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });
    console.log("WebSocket URL:", `ws://localhost:8080/ws${this.userId ? `?userId=${this.userId}` : ""}`);

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
      this.client.deactivate();
    }
  }
}

export default new WebSocketService();


