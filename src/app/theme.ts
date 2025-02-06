import { createTheme, ThemeOptions } from "@mui/material/styles"

export const PALETTE_MODE_KEY = "paletteMode" as const

export enum Mode {
  LIGHT = "light",
  DARK = "dark",
}

const commonPalette = {
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
  },
  secondary: {
    main: "#dc004e",
    light: "#ff4081",
    dark: "#c51162",
  },
} as const

const getThemeOptions = (mode: Mode): ThemeOptions => ({
  palette: {
    mode,
    ...commonPalette,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

export const getTheme = (mode: Mode) => createTheme(getThemeOptions(mode))

export default getTheme
