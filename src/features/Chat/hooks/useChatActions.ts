import { useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import { Role } from "@features/Chat/types"
import { useChatStore } from "@features/Chat/stores/chatStore"

export const useChatActions = () => {
  const {
    addSession,
    addMessage,
    updateMessage: updateStoreMessage,
    setLoadingMessage,
  } = useChatStore()

  const addNewMessage = useCallback(
    ({ sessionId, content, role }: { sessionId: string; content: string; role: Role }): string => {
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
    [addMessage, setLoadingMessage],
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
      sessionId,
      messageId,
      content,
      finalUpdate = false,
    }: {
      sessionId: string
      messageId: string
      content: string
      finalUpdate: boolean
    }) => {
      updateStoreMessage(sessionId, messageId, { content })
      if (finalUpdate) setLoadingMessage(sessionId, false)
    },
    [updateStoreMessage, setLoadingMessage],
  )

  return { addNewSession, addNewMessage, updateMessage }
}
