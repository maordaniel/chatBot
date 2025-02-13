import React, { useCallback, useEffect, useRef, useState } from "react"
import { Box, Paper } from "@mui/material"
import { Message } from "@features/Chat/types"
import { useChatStore } from "@features/Chat/stores/chatStore"
import { useChatActions } from "@features/Chat/hooks/useChatActions"
import ChatInput from "@features/Chat/components/ChatInput"
import ChatMessage from "@features/Chat/components/ChatMessage"

interface ChatBoardProps {
  messages: Message[]
  sessionId: string
}

const ChatBoard = ({ messages, sessionId }: ChatBoardProps) => {
  const { loadingMessage } = useChatStore()
  const { handleSendMessage } = useChatActions(sessionId)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isLlmResLoading = loadingMessage[sessionId]

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const onSendMessage = useCallback(
    async (prompt: string) => {
      setError(null)
      const errorMessage = await handleSendMessage(prompt, messages)
      if (errorMessage) setError(errorMessage)
    },
    [handleSendMessage, messages],
  )

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
      <ChatInput onSendMessage={onSendMessage} disabled={isLlmResLoading} />
    </Paper>
  )
}

export default ChatBoard
