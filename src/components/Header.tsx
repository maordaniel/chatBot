import React, { PropsWithChildren } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

const Header = ({ children }: PropsWithChildren) => (
  <AppBar
    position="static"
    sx={{
      display: "flex",
      position: "relative",
      zIndex: (theme) => theme.zIndex.drawer + 1,
    }}
  >
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Chat Bot
      </Typography>
      {children}
    </Toolbar>
  </AppBar>
)

export default Header
