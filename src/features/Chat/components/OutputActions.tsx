import React from "react"
import { copyToClipboard } from "@/utils"
import IconButton from "@mui/material/IconButton"
import CopyIcon from "@mui/icons-material/FileCopyOutlined"

interface OutputActionsProps {
  message: string
}

const OutputActions = ({ message }: OutputActionsProps): React.JSX.Element => (
  <IconButton onClick={() => copyToClipboard(message)}>
    <CopyIcon fontSize="small" color="action" />
  </IconButton>
)

export default OutputActions
