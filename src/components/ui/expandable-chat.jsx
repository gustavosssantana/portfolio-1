import { useState } from "react"
import { X, MessageCircle } from "lucide-react"

const ExpandableChat = ({ position = "bottom-right", children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div style={{
      position: "fixed",
      bottom: 28,
      right: position === "bottom-right" ? 28 : "auto",
      left: position === "bottom-left" ? 28 : "auto",
      zIndex: 50,
    }}>
      {isOpen && (
        <div style={{
          marginBottom: 16,
          width: 380,
          height: 520,
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(12,12,12,0.95)",
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}>
          {children}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.1)",
          backgroundColor: isOpen ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)",
          color: isOpen ? "rgba(255,255,255,0.7)" : "#000",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          float: "right",
        }}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  )
}

const ExpandableChatHeader = ({ children }) => (
  <div style={{
    padding: "16px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  }}>
    {children}
  </div>
)

const ExpandableChatBody = ({ children }) => (
  <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
    {children}
  </div>
)

export { ExpandableChat, ExpandableChatHeader, ExpandableChatBody }
