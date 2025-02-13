import  { memo } from "react"
import { Paper, Typography, Box, SxProps } from "@mui/material"
import { Message, Role } from "@features/Chat/types"
import AssistantIcon from "@mui/icons-material/Assistant"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import OutputLoader from "@features/Chat/components/OutputLoader"
import OutputActions from "@features/Chat/components/OutputActions"

const messageContainerStyles: SxProps = {
  mb: 2,
  width: "100%",
  display: "flex",
}

const paperStyles: SxProps = {
  p: 2,
  borderRadius: 2,
  wordBreak: "break-word",
  maxWidth: { xs: "75%", sm: "60%", md: "45%" },
}

const messageContentStyles: SxProps = {
  mb: 1,
  gap: 1,
  display: "flex",
  alignItems: "flex-start",
  whiteSpace: "pre-wrap",
}

const footerStyles: SxProps = {
  mt: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}

const MessageContent = ({ isAssistant, content }: { isAssistant: boolean; content: string }) => (
  <>
    {isAssistant ? <AssistantIcon  /> : null}
    {content}
    {!isAssistant ? <AccountCircleIcon  /> : null}
  </>
)

interface ChatMessageProps {
  message: Message
  isLlmResLoading: boolean
}
const ChatMessage = memo(
  ({ isLlmResLoading, message: { role, timestamp, content } }: ChatMessageProps) => {
    const isAssistant = role === Role.MODEL

    return (
      <Box
        sx={{
          ...messageContainerStyles,
          justifyContent: isAssistant ? "flex-start" : "flex-end",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            ...paperStyles,
            backgroundColor: isAssistant ? "primary.light" : "secondary.light",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              ...messageContentStyles,
              justifyContent: isAssistant ? "flex-start" : "flex-end",
            }}
          >
            <MessageContent isAssistant={isAssistant} content={content} />
          </Typography>

          {isLlmResLoading && <OutputLoader />}

          <Box sx={footerStyles}>
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
