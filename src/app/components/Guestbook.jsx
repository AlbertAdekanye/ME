"use client";
import { useState, useEffect } from "react";

export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load messages and dark mode preference on page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMessages = JSON.parse(localStorage.getItem("guestbook")) || [];
      setMessages(savedMessages);

      const savedTheme = localStorage.getItem("darkMode");
      if (savedTheme === "true" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        setDarkMode(true);
      }
    }
  }, []);

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return alert("Please fill out both fields!");

    const newMessage = { name: name.trim(), message: message.trim(), time: new Date().toLocaleString() };
    const updatedMessages = [newMessage, ...messages];

    setMessages(updatedMessages);
    localStorage.setItem("guestbook", JSON.stringify(updatedMessages));

    setName("");
    setMessage("");
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} transition-colors`}>
      <div className="max-w-lg mx-auto p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-all">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded-full text-sm"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">🎈 Sign My Guestbook 🎉</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-lg w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
          <textarea
            placeholder="Write a birthday message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 border rounded-lg w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
            rows="3"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Submit 🎊
          </button>
        </form>

        {/* Messages */}
        <div className="mt-6">
          {messages.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300 text-center">No messages yet. Be the first! 🎂</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-700">
                  <p className="font-bold">{msg.name}:</p>
                  <p>{msg.message}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
