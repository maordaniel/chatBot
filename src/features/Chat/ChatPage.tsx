import React, { useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { useChat } from "@features/Chat/hooks/useChat"
import { useParams, useNavigate } from "react-router-dom"
import ChatBoard from "@features/Chat/components/ChatBoard"
import SideBar, { DRAWER_WIDTH } from "@/components/SideBar"
import { useChatStore } from "@features/Chat/stores/chatStore"

const ChatPage = () => {
  const navigate = useNavigate()
  const { sessionId } = useParams<{ sessionId: string }>()
  const { addNewSession } = useChat()
  const { sessions, currentSessionId, setCurrentSession } = useChatStore()

  useEffect(() => {
    const initializeSession = () => {
      if (sessionId && sessions[sessionId]) {
        if (sessionId !== currentSessionId) setCurrentSession(sessionId)
        return
      }

      if (Object.keys(sessions).length) navigate(`/chat/${Object.keys(sessions)[0]}`)
    }

    initializeSession()
  }, [addNewSession, currentSessionId, navigate, sessionId, sessions, setCurrentSession])

  const currentSession = sessions[currentSessionId]

  return (
    <Box sx={{ display: "flex", height: "93vh" }}>
      <SideBar />
      <Box
        component="main"
        sx={{
          p: 3,
          flexGrow: 1,
          ml: { sm: `${DRAWER_WIDTH}px` },
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          overflow: "hidden",
        }}
      >
        {currentSession ? (
          <ChatBoard
            sessionId={currentSession.id}
            messages={Object.values(currentSession.messages)}
          />
        ) : (
          <Box
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
          >
            <Typography variant="h6">
              {sessionId ? "No chat session found" : "Start a new chat"}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ChatPage
