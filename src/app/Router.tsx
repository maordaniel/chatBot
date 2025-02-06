import React, { useEffect } from "react"
import { ChatPage } from "@features/Chat"
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const CHAT_ROUTE = "chat"

const Router = () => {
  const NotFound = () => {
    const navigate = useNavigate()
    useEffect(() => {
      setTimeout(() => {
        navigate(`/${CHAT_ROUTE}`)
      }, 1500)
    }, [navigate])

    return (
      <Box>
        <Typography variant="h3">Page not found</Typography>
      </Box>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to={CHAT_ROUTE} />} />
        <Route path={`${CHAT_ROUTE}/:sessionId?`} element={<ChatPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
