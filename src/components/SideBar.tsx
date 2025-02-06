import React, { memo, useMemo, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Add as AddIcon } from "@mui/icons-material"
import { useChatStore } from "@features/Chat/stores/chatStore"
import { Box, List, Drawer, Button, Divider } from "@mui/material"
import { useChatActions } from "@features/Chat/hooks/useChatActions"
import SessionItem from "./SessionItem"
import DeleteActionDialog from "./ DeleteActionDialog"

export const DRAWER_WIDTH = 280

const SideBar = () => {
  const navigate = useNavigate()
  const { addNewSession } = useChatActions()
  const { sessions, currentSessionId, deleteSession } = useChatStore()
  
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null)

  const sortedSessions = useMemo(() => {
    return [...Object.values(sessions)].sort((a, b) => {
      const timeA = a?.updatedAt instanceof Date ? a.updatedAt.getTime() : 0
      const timeB = b?.updatedAt instanceof Date ? b.updatedAt.getTime() : 0
      return timeB - timeA
    })
  }, [sessions])

  const handleNewChat = useCallback(
    () => navigate(`/chat/${addNewSession()}`),
    [navigate, addNewSession],
  )

  const handleSelectChat = useCallback(
    (sessionId: string) => {
      if (currentSessionId !== sessionId) navigate(`/chat/${sessionId}`)
    },
    [navigate, currentSessionId],
  )

  const handleDeleteClick = useCallback((sessionId: string) => setSessionToDelete(sessionId), [])

  const handleConfirmDelete = useCallback(() => {
    if (!sessionToDelete) return

    deleteSession(sessionToDelete)
    setSessionToDelete(null)
  }, [sessionToDelete, deleteSession])

  const handleDrawerToggle = useCallback(() => setMobileOpen((prev) => !prev), [])

  return (
    <>
      <Drawer
        variant={mobileOpen ? "temporary" : "permanent"}
        open={mobileOpen || undefined}
        ModalProps={{ keepMounted: true }}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: mobileOpen ? "block" : "none", sm: "block" },
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH, marginTop: "4rem" },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Box sx={{ p: 2 }}>
            <Button fullWidth variant="contained" startIcon={<AddIcon />} onClick={handleNewChat}>
              New Chat
            </Button>
          </Box>
          <Divider />
          <List sx={{ flexGrow: 1, overflow: "auto" }}>
            {sortedSessions.map((session) => (
              <SessionItem
                key={session.id}
                id={session.id}
                title={session.title}
                createdAt={session.createdAt}
                isSelected={session.id === currentSessionId}
                onSelect={handleSelectChat}
                onDelete={handleDeleteClick}
              />
            ))}
          </List>
        </Box>
      </Drawer>

      <DeleteActionDialog
        open={!!sessionToDelete}
        onConfirm={handleConfirmDelete}
        onClose={() => setSessionToDelete(null)}
      />
    </>
  )
}

export default memo(SideBar)
