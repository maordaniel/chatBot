import { useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import { Message, Role } from "@features/Chat/types"
import { useChatStore } from "@features/Chat/stores/chatStore"
import { getLLMStreamResponse } from "@features/Chat/services/LLMService"

export const useChatActions = (sessionId: string) => {
  const {
    addSession,
    addMessage,
    updateMessage: updateStoreMessage,
    setLoadingMessage,
  } = useChatStore()

  const addNewMessage = useCallback(
    ({ content, role }: { content: string; role: Role }): string => {
      const messageId = uuidv4()
      addMessage(sessionId, {
        id: messageId,
        role,
        content,
        timestamp: new Date(),
      })

      setLoadingMessage(sessionId, true)

      return messageId
    },
    [addMessage, sessionId, setLoadingMessage],
  )

  const addNewSession = useCallback((): string => {
    const newSessionId = uuidv4()
    const now = new Date()
    addSession({
      id: newSessionId,
      title: `Chat ${now.toLocaleTimeString()}`,
      messages: {},
      createdAt: now,
      updatedAt: now,
    })

    return newSessionId
  }, [addSession])

  const updateMessage = useCallback(
    ({
      messageId,
      content,
      finalUpdate = false,
    }: {
      messageId: string
      content: string
      finalUpdate: boolean
    }) => {
      updateStoreMessage(sessionId, messageId, { content })
      if (finalUpdate) setLoadingMessage(sessionId, false)
    },
    [updateStoreMessage, sessionId, setLoadingMessage],
  )

  const handleSendMessage = useCallback(
    async (prompt: string, messages: Message[]) => {
      addNewMessage({ content: prompt, role: Role.USER })
      const assistantMessageId = addNewMessage({ content: "", role: Role.MODEL })

      const messageContext = messages.map((msg) => ({
        parts: [{ text: msg.content }],
        role: msg.role,
      }))

      let responseText = ""
      try {
        await getLLMStreamResponse(prompt, messageContext, (text) => {
          responseText += text
          updateMessage({
            finalUpdate: false,
            content: responseText,
            messageId: assistantMessageId,
          })
        })

        updateMessage({
          finalUpdate: true,
          content: responseText,
          messageId: assistantMessageId,
        })
        return null
      } catch (err) {
        updateMessage({
          finalUpdate: true,
          content: "Not able to get response from LLM",
          messageId: assistantMessageId,
        })
        console.error("LLM Response Error:", err)
        return "Failed to get response. Please try again."
      }
    },
    [addNewMessage, updateMessage],
  )

  return { addNewSession, addNewMessage, updateMessage, handleSendMessage }
}
