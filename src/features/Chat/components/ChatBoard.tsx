import React, { useCallback, useEffect, useRef, useState } from "react"
import { Box, Paper } from "@mui/material"
import { Message, Role } from "@features/Chat/types"
import { useChatStore } from "@features/Chat/stores/chatStore"
import { useChatActions } from "@features/Chat/hooks/useChatActions"
import { getLLMStreamResponse } from "@features/Chat/services/LLMService"
import ChatInput from "@features/Chat/components/ChatInput"
import ChatMessage from "@features/Chat/components/ChatMessage"

interface ChatBoardProps {
  messages: Message[]
  sessionId: string
}

const ChatBoard = ({ messages, sessionId }: ChatBoardProps) => {
  const { loadingMessage } = useChatStore()
  const { addNewMessage, updateMessage } = useChatActions()
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isLlmResLoading = loadingMessage[sessionId]

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = useCallback(
    async (prompt: string) => {
      setError(null)
      addNewMessage({ sessionId, content: prompt, role: Role.USER })

      let responseText = ""
      const assistantMessageId = addNewMessage({
        sessionId,
        content: responseText,
        role: Role.ASSISTANT,
      })

      try {
        await getLLMStreamResponse(prompt, (text) => {
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
    },
    [addNewMessage, sessionId, updateMessage],
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
      <ChatInput onSendMessage={handleSendMessage} disabled={isLlmResLoading} />
    </Paper>
  )
}

export default ChatBoard
