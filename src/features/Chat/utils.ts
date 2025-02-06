import { LLMResponse } from "@features/Chat/types"

const cleanJsonChunk = (chunk: string): string => {
  return chunk
    .replace(/^,\s*/, "")
    .replace(/^\[\s*/, "")
    .replace(/\s*\]$/, "")
    .trim()
}

const extractTextFromResponse = (response: LLMResponse): string => {
  return response.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
}

export const processChunk = (chunk: string, onChunk: (text: string) => void) => {
  const jsonChunk = cleanJsonChunk(chunk)

  if (jsonChunk && jsonChunk.startsWith("{") && jsonChunk.endsWith("}")) {
    try {
      const parsedChunk: LLMResponse = JSON.parse(jsonChunk)
      const text = extractTextFromResponse(parsedChunk)
      onChunk(text)
    } catch (error) {
      console.error("Error parsing chunk:", error)
    }
  }
}
