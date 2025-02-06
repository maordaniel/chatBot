import { processChunk } from "@features/Chat/utils"

const API_KEY = import.meta.env.VITE_LLM_API_KEY

const LLM_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:streamGenerateContent?key=${API_KEY}`

export const getLLMStreamResponse = async (prompt: string, onChunk: (text: string) => void) => {
  try {
    const response = await fetch(LLM_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    if (!response.body) {
      throw new Error("No response body")
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder("utf-8")

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      processChunk(chunk, onChunk)
    }
  } catch (error) {
    console.error("Error in getLLMStreamResponse:", error)
    throw error
  }
}
