import React, { useEffect } from "react"
import { CHAT_ROUTE } from "@/app/Router"
import { useParams, useNavigate } from "react-router-dom"
import SideBar, { DRAWER_WIDTH } from "@/components/SideBar"
import { useChatStore } from "@features/Chat/stores/chatStore"
import { Box, IconButton, Stack, Typography } from "@mui/material"
import { useChatActions } from "@features/Chat/hooks/useChatActions"
import CreateIcon from "@mui/icons-material/Create"
import ChatBoard from "@features/Chat/components/ChatBoard"

const ChatPage = () => {
  const navigate = useNavigate()
  const { sessionId } = useParams<{ sessionId: string }>()
  const { addNewSession } = useChatActions()
  const { sessions, currentSessionId, setCurrentSession } = useChatStore()

  useEffect(() => {
    const initializeSession = () => {
      if (sessionId && sessions[sessionId]) {
        if (sessionId !== currentSessionId) setCurrentSession(sessionId)
        return
      }

      const firstSessionId = Object.keys(sessions)[0]
      if (!!firstSessionId) navigate(`/${CHAT_ROUTE}/${firstSessionId}`)
    }

    initializeSession()
  }, [addNewSession, currentSessionId, navigate, sessionId, sessions, setCurrentSession])

  const currentSession = sessions[currentSessionId]

  const handleNewChat = () => navigate(`/${CHAT_ROUTE}/${addNewSession()}`)

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 4rem)",
      }}
    >
      <SideBar />
      <Box
        component="main"
        sx={{
          p: 3,
          flexGrow: 1,
          ml: { sm: `${DRAWER_WIDTH}px` },
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        {!!currentSession ? (
          <ChatBoard
            sessionId={currentSession.id}
            messages={Object.values(currentSession.messages)}
          />
        ) : (
          <Stack
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
          >
            <Typography variant="h6">{sessionId && "No chat session found"}</Typography>
            <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
              Start a new chat
              <IconButton onClick={handleNewChat}>
                <CreateIcon />
              </IconButton>
            </Typography>
          </Stack>
        )}
      </Box>
    </Box>
  )
}

export default ChatPage
