import React from "react"
import IconButton from "@mui/material/IconButton"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"

interface PaletteModeBtnProps {
  isDarkTheme: boolean
  changeThemeMode: () => void
}

const PaletteModeBtn = ({ isDarkTheme, changeThemeMode }: PaletteModeBtnProps) => (
  <IconButton onClick={changeThemeMode}>
    {isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
  </IconButton>
)

export default PaletteModeBtn
