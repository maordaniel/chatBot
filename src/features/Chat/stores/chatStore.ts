import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ChatSession, Message } from "@features/Chat/types"

interface ChatStore {
  currentSessionId: string
  sessions: Record<string, ChatSession>
  loadingMessage: Record<string, boolean>
  addSession: (session: ChatSession) => void
  deleteSession: (sessionId: string) => void
  setCurrentSession: (sessionId: string) => void
  addMessage: (sessionId: string, message: Message) => void
  setLoadingMessage: (sessionId: string, loading: boolean) => void
  updateMessage: (sessionId: string, messageId: string, updates: Partial<Message>) => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      sessions: {},
      currentSessionId: "",
      loadingMessage: {},
      addSession: (session) =>
        set(({ sessions }) => ({
          sessions: { [session.id]: session, ...sessions },
          currentSessionId: session.id,
        })),
      addMessage: (sessionId, message) =>
        set(({ sessions }) => ({
          sessions: {
            ...sessions,
            [sessionId]: {
              ...sessions[sessionId],
              updatedAt: new Date(),
              messages: {
                ...sessions[sessionId].messages,
                [message.id]: message,
              },
            },
          },
        })),
      updateMessage: (sessionId, messageId, updates) =>
        set(({ sessions }) => ({
          sessions: {
            ...sessions,
            [sessionId]: {
              ...sessions[sessionId],
              updatedAt: new Date(),
              messages: {
                ...sessions[sessionId].messages,
                [messageId]: {
                  ...sessions[sessionId].messages[messageId],
                  ...updates,
                },
              },
            },
          },
        })),
      deleteSession: (sessionId) =>
        set(({ sessions, currentSessionId }) => {
          const { [sessionId]: _, ...remainingSessions } = sessions
          return {
            sessions: remainingSessions,
            currentSessionId: currentSessionId === sessionId ? "" : currentSessionId,
          }
        }),
      setCurrentSession: (sessionId) => set({ currentSessionId: sessionId }),
      setLoadingMessage: (sessionId, loading) =>
        set(({ loadingMessage }) => ({
          loadingMessage: { ...loadingMessage, [sessionId]: loading },
        })),
    }),
    {
      name: "chat-store",
      partialize: (state) => {
        const { loadingMessage, ...persistedState } = state
        return persistedState
      },
    },
  ),
)
