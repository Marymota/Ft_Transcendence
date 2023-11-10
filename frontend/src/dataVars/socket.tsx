import { Socket, io } from "socket.io-client";

export interface Data<T> {
  data: T;
}

export class mySocket {
  private _socket: Socket;

  constructor() {
    this._socket = io("http://localhost:3000");
    this._socket.on("connect", () => {
			console.log("connection id: ", this._socket.id);
		});
    this._socket.on("disconnect", () => {
      this._socket.close();
      window.location.reload();
    });
  }

  get socket(): Socket {
    return this._socket;
  }

  subscribe(event: string, callback: (...args: any[]) => void): void {
    this._socket.on(event, callback);
  }

  unsubscribe(event: string): void {
    this._socket.off(event);
  }

  send(event: string, ...args: any[]): void {
    this._socket.emit(event, ...args);
  }

  async subscribeOnce(event: string, body: any): Promise<Response | Data<any>> {
    return new Promise((resolve) => {
      const handler = (data: any) => {
        this.unsubscribe(event);
        resolve(data);
      };
      this.subscribe(event, handler);
      this.send(event, body);
    });
  }
}
