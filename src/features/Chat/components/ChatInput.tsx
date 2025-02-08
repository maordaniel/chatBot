import React from "react"
import { Send } from "@mui/icons-material"
import { useState, KeyboardEvent } from "react"
import { TextField, IconButton, Box } from "@mui/material"

interface ChatInputProps {
  disabled?: boolean
  onSendMessage: (prompt: string) => void
}

const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Box sx={{ display: "flex", p: 2 }}>
      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "1rem",
            },
          },
        }}
        fullWidth
        multiline
        maxRows={4}
        value={message}
        variant="outlined"
        disabled={disabled}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <IconButton color="primary" onClick={handleSend} disabled={disabled || !message.trim()}>
        <Send />
      </IconButton>
    </Box>
  )
}

export default React.memo(ChatInput)
