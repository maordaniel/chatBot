import { memo } from "react"
import { Paper, Typography, Box } from "@mui/material"
import { Message, Role } from "@features/Chat/types"
import OutputActions from "@features/Chat/components/OutputActions"
import OutputLoader from "@features/Chat/components/OutputLoader"

interface ChatMessageProps {
  message: Message
  isLlmResLoading: boolean
}

const ChatMessage = memo(
  ({ isLlmResLoading, message: { role, timestamp, content } }: ChatMessageProps) => {
    const isAssistant = role === Role.ASSISTANT

    return (
      <Box
        sx={{
          mb: 2,
          width: "100%",
          display: "flex",
          justifyContent: isAssistant ? "flex-start" : "flex-end",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 2,
            wordBreak: "break-word",
            maxWidth: { xs: "75%", sm: "60%", md: "45%" },
            backgroundColor: isAssistant ? "primary.light" : "secondary.light",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              mb: 1,
              whiteSpace: "pre-wrap",
            }}
          >
            {content}
          </Typography>
          {isLlmResLoading && <OutputLoader />}
          <Box
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {new Date(timestamp).toLocaleTimeString()}
            </Typography>
            {isAssistant && <OutputActions message={content} />}
          </Box>
        </Paper>
      </Box>
    )
  },
)

export default ChatMessage