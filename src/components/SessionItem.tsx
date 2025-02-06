import React, { memo } from "react"
import { ChatSession } from "@features/Chat/types"
import { Chat as ChatIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

interface SessionItemProps extends Pick<ChatSession, "id" | "title" | "createdAt"> {
  isSelected: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

const SessionItem = ({
  id,
  title,
  createdAt,
  isSelected,
  onSelect,
  onDelete,
}: SessionItemProps) => (
  <ListItem
    disablePadding
    secondaryAction={
      <IconButton edge="end" onClick={() => onDelete(id)}>
        <DeleteIcon />
      </IconButton>
    }
  >
    <ListItemButton selected={isSelected} onClick={() => onSelect(id)}>
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary={title} secondary={new Date(createdAt).toLocaleDateString()} />
    </ListItemButton>
  </ListItem>
)

export default memo(SessionItem)
