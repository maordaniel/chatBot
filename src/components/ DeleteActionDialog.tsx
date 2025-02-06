import React, { memo } from "react"
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"

interface DeleteActionDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteActionDialog = memo(({ open, onClose, onConfirm }: DeleteActionDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Are you sure you want to delete this chat?</DialogTitle>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm} color="error">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
))

export default DeleteActionDialog
