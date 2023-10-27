import { useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

export const socket = io("http://localhost:3000");

export default function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connection ID : ", socket.id);
    });
  }, []);

  function createUser(name: string) {
    socket.emit("createUser", name);
  }

  function printUsers() {
    socket.emit("printUsers");
  }

  return (
    <div className="page">
      <div className="testAPI">
        <input id="userNameInput" type="text" placeholder="Name"></input>
        <button
          onClick={() => {
            createUser(
              (document.getElementById("userNameInput") as HTMLInputElement)
                .value
            );
          }}
        >
          Create
        </button>
      </div>
      <div className="testAPI">
        <button
          onClick={() => {
            printUsers();
          }}
        >
          Print Users
        </button>
      </div>
    </div>
  );
}
