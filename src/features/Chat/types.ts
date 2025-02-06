export enum Role {
  USER = "user",
  ASSISTANT = "assistant",
}

export interface Message {
  id: string
  content: string
  role: Role
  timestamp: Date
}

export interface ChatSession {
  id: string
  title: string
  messages: Record<string, Message>
  createdAt: Date
  updatedAt: Date
}

export interface LLMResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string
      }>
    }
  }>
}
