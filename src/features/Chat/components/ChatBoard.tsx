import React, { useEffect, useRef, useState } from "react"
import { Box, Paper } from "@mui/material"
import { Message, Role } from "@features/Chat/types"
import { useChat } from "@features/Chat/hooks/useChat"
import { useChatStore } from "@features/Chat/stores/chatStore"
import { ChatInput } from "@features/Chat/components/ChatInput"
import { ChatMessage } from "@features/Chat/components/ChatMessage"
import { getLLMStreamResponse } from "@features/Chat/services/LLMService"

interface ChatBoardProps {
  messages: Message[]
  sessionId: string
}

const ChatBoard = ({ messages, sessionId }: ChatBoardProps) => {
  const { addNewMessage, updateMessage } = useChat()
  const { loadingMessage } = useChatStore()
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isLlmResLoading = loadingMessage[sessionId]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    setError(null)
    addNewMessage({ sessionId, content, role: Role.USER })

    let responseText = ""
    const assistantMessageId = addNewMessage({
      sessionId,
      content: responseText,
      role: Role.ASSISTANT,
    })

    try {
      await getLLMStreamResponse(content, (text) => {
        responseText += text
        updateMessage({
          sessionId,
          finalUpdate: false,
          content: responseText,
          messageId: assistantMessageId,
        })
      })

      updateMessage({
        sessionId,
        finalUpdate: true,
        content: responseText,
        messageId: assistantMessageId,
      })
      
    } catch (err) {
      updateMessage({
        sessionId,
        finalUpdate: true,
        content: "Not able to get response from LLM",
        messageId: assistantMessageId,
      })
      setError("Failed to get response. Please try again.")
      console.error("LLM Response Error:", err)
    }
  }

  return (
    <Paper elevation={3} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages.map((message, index) => {
          const isLastMessage = index === messages.length - 1
          return (
            <ChatMessage
              key={message.id}
              message={message}
              isLlmResLoading={isLlmResLoading && isLastMessage}
            />
          )
        })}
        {error && <Box sx={{ color: "error.main", mt: 1, textAlign: "center" }}>{error}</Box>}
        <Box ref={messagesEndRef} />
      </Box>
      <ChatInput onSendMessage={handleSendMessage} disabled={isLlmResLoading} />
    </Paper>
  )
}

export default ChatBoard
