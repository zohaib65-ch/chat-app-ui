"use client";

import React, { useState } from "react";
import { Search, Send, Menu, X } from "lucide-react";

const ChatApp = () => {
  const chatListData = [
    {
      id: 1,
      name: "Zohaib",
      messages: [
        { sender: "other", text: "Hey! How’s it going?" },
        { sender: "me", text: "Pretty good, working on a project. You?" },
      ],
    },
    {
      id: 2,
      name: "John Doe",
      messages: [
        { sender: "other", text: "Yo! Did you finish the design?" },
        { sender: "me", text: "Almost! Will send it tonight." },
      ],
    },
    {
      id: 3,
      name: "Jane Smith",
      messages: [
        { sender: "other", text: "Want to grab lunch tomorrow?" },
        { sender: "me", text: "Sure! What time?" },
      ],
    },
  ];

  const [chatList, setChatList] = useState(chatListData);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(chatListData[0]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, { sender: "me", text: input }],
    };

    setSelectedChat(updatedChat);

    const updatedList = chatList.map((chat) => (chat.id === selectedChat.id ? updatedChat : chat));
    setChatList(updatedList);

    setInput("");
  };

  // Helper to truncate message after 2–3 words
  const truncateMessage = (text: string) => {
    const words = text.split(" ");
    if (words.length <= 3) return text;
    return words.slice(0, 3).join(" ") + "...";
  };

  return (
    <div className="max-h-screen flex justify-center items-center   text-white p-4">
      <div className="w-full max-w-7xl h-[85vh] flex rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-white/10  relative">
        <div
          className={` border-r  border-white/10 flex-shrink-0 flex flex-col absolute bg-gradient-to-br from-gray-800 to-gray-900 border  lg:static top-0 left-0 h-full z-20 transform transition-transform duration-300 w-64
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          <div className="p-5 border-b   border-white/10  flex justify-center items-center">
            <h2 className="text-lg font-medium italic">Start Chats</h2>

            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="p-3">
            <div className="flex items-center gap-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-md px-3 py-2">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Search..." className="bg-transparent  outline-none text-sm w-full" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat);
                  setSidebarOpen(false);
                }}
                className={`px-4 py-2 mb-2 cursor-pointer flex border border-gray-600 items-center gap-3 transition ${selectedChat.id === chat.id ? "bg-gray-800 rounded-lg mx-2" : "hover:bg-gray-800 rounded-lg mx-2"}`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border flex items-center justify-center font-bold">{chat.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{chat.name}</p>
                  <p className="text-xs text-gray-400 truncate">{truncateMessage(chat.messages[chat.messages.length - 1]?.text || "")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-1 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600">
          <div className="p-4 border-white/10 flex justify-between items-center">
            <div className="flex items-center  gap-3">
              <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
                <Menu size={20} />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 border border-gray-600 to-gray-900 flex items-center justify-center font-bold">{selectedChat.name[0]}</div>
              <div>
                <p className="font-medium">{selectedChat.name}</p>
                <p className="text-xs text-gray-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {selectedChat.messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-4 py-2 rounded-xl max-w-xs ${
                    msg.sender === "me" ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-gray-600" : "bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-gray-600"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4  flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600  rounded-md px-4 py-2 text-sm outline-none"
            />
            <button onClick={sendMessage} className="bg-gradient-to-br from-gray-800  to-gray-900 border border-gray-600 hover:bg-gray-700 rounded-md p-2">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
