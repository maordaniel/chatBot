import React from "react"
import { keyframes } from "@mui/system"
import Box from "@mui/material/Box"

const dotsLoader = keyframes`
  to {
    opacity: 0.1;
  }
`
const OutputLoader = (): React.JSX.Element => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        ">div:nth-of-type(2)": {
          animationDelay: "0.2s",
        },
        ">div:nth-of-type(3)": {
          animationDelay: "0.4s",
        },
      }}
    >
      {Array.from({ length: 3 }, (_, index) => (
        <Box
          key={index}
          sx={{
            opacity: 1,
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "50%",
            margin: "0.2rem 0.4rem",
            backgroundColor: "black",
            animation: `${dotsLoader} 1s infinite alternate`,
          }}
        />
      ))}
    </Box>
  )
}

export default OutputLoader
