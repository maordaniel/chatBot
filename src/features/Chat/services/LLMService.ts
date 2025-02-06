const API_KEY = import.meta.env.VITE_LLM_API_KEY

interface LLMResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string
      }>
    }
  }>
}

export const getLLMStreamResponse = async (prompt: string, onChunk: (text: string) => void) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:streamGenerateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      },
    )

    if (!response.body) throw new Error("No response body")

    const reader = response.body.getReader()
    const decoder = new TextDecoder("utf-8")

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })

      const jsonChunk = chunk
        .replace(/^,\s*/, "")
        .replace(/^\[\s*/, "")
        .replace(/\s*\]$/, "")
        .trim()

      if (jsonChunk && jsonChunk.startsWith("{") && jsonChunk.endsWith("}")) {
        const parsedChunk: LLMResponse = JSON.parse(jsonChunk)
        const text = parsedChunk.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
        onChunk(text)
      }
    }
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}
