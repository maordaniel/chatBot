import React, { useState, useCallback, useMemo } from "react"
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { ErrorBoundary } from "react-error-boundary"
import getTheme, { Mode, PALETTE_MODE_KEY } from "./theme"
import Router from "./Router"
import Header from "@/components/Header"
import PaletteModeBtn from "@/components/PaletteModeBtn"

const App = () => {
  const getInitialPaletteMode = (): Mode => {
    const defaultMode = Mode.DARK
    const storedPaletteMode = localStorage.getItem(PALETTE_MODE_KEY)
    return (storedPaletteMode as Mode) ?? defaultMode
  }

  const [paletteMode, setPaletteMode] = useState<Mode>(getInitialPaletteMode)

  const theme = useMemo(() => getTheme(paletteMode), [paletteMode])

  const isDarkTheme = paletteMode === Mode.DARK

  const changeThemeMode = useCallback(() => {
    setPaletteMode((prevMode) => {
      const newMode = prevMode === Mode.DARK ? Mode.LIGHT : Mode.DARK
      localStorage.setItem(PALETTE_MODE_KEY, newMode)
      return newMode
    })
  }, [])

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header>
          <PaletteModeBtn isDarkTheme={isDarkTheme} changeThemeMode={changeThemeMode} />
        </Header>
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
