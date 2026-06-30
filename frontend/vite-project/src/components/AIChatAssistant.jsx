import { useState, useRef, useEffect } from "react";

const AIChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Assalamu Alaikum! 👋 I'm your KashmirCraft assistant. Ask me anything about our products, orders, or Kashmiri crafts!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8002/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      setMessages([...updatedMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...updatedMessages, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 9999,
          width: "56px", height: "56px", borderRadius: "50%",
          background: "#8B4513", color: "white", border: "none",
          fontSize: "24px", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat Window */}
      {open && (
        <div style={{
          position: "fixed", bottom: "90px", right: "24px", zIndex: 9998,
          width: "340px", height: "460px", background: "white",
          borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{ background: "#8B4513", padding: "14px 16px", color: "white" }}>
            <p style={{ margin: 0, fontWeight: "600", fontSize: "15px" }}>🪷 KashmirCraft Assistant</p>
            <p style={{ margin: 0, fontSize: "12px", opacity: 0.85 }}>Ask about products, crafts & orders</p>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                background: msg.role === "user" ? "#8B4513" : "#f3f3f3",
                color: msg.role === "user" ? "white" : "#222",
                padding: "9px 13px", borderRadius: "12px",
                maxWidth: "80%", fontSize: "13px", lineHeight: "1.5",
              }}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", background: "#f3f3f3", padding: "9px 13px", borderRadius: "12px", fontSize: "13px" }}>
                Typing...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "10px", borderTop: "1px solid #eee", display: "flex", gap: "8px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              style={{
                flex: 1, padding: "8px 12px", borderRadius: "8px",
                border: "1px solid #ddd", fontSize: "13px", outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                background: "#8B4513", color: "white", border: "none",
                borderRadius: "8px", padding: "8px 14px", cursor: "pointer", fontSize: "13px",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatAssistant;