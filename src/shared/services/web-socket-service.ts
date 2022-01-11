import * as SignalR from '@microsoft/signalr';

class WebSocketService {
   connection: SignalR.HubConnection | null = null;

   // constructor() {
   //   this.initConnection();
   // }

   // async initConnection() {
   //   try {
   //     this.connection = await new SignalR.HubConnectionBuilder()
   //       .withUrl('ws://localhost:8080')
   //       .build();
   //     this.connection.start();
   //   } catch (error) {
   //     console.log(error);
   //   }
   // }

   sendMessage(methodName: string, message: { params: any; content: string }) {
      this.connection?.invoke(methodName, message);
   }
}

export const webSocket = new WebSocketService();
