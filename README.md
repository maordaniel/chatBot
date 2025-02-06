# Chat bot

## Getting Started

1. Clone the repository
2. Install dependencies using yarn

```bash
yarn install
```

3. Create a `.env` file in the root of the project and add the following:

```bash
VITE_LLM_API_KEY=your_api_key
```

4. Start the development server

```bash
yarn dev
```

## Requirements

- node version 22.13.1
- api key for llm

## Technical Choices

### Core Technologies

- **React + TypeScript**: Chosen for type safety, better developer experience, and robust ecosystem
- **Material UI**: Chosen for its robust design system and ease of use
- **Vite**: Selected as build tool for its superior development experience and fast HMR
- **Zustand**: Chosen for its state management capabilities and ease of use
- **React Router**: Chosen for its routing capabilities and ease of use
- **ESLint**: Ensures code quality and consistency across the codebase
- **Prettier**: Ensures code formatting consistency across the codebase

### Key Libraries

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Faster compilation compared to Babel
- [Other key libraries and justifications...]

## Folder Structure

- bulletproof-react folder structure

```bash
src
|
+-- app # application layer containing:
| | # this folder might differ based on the meta framework used
| +-- routes # application routes / can also be pages
| +-- app.tsx # main application component
  | +-- router.tsx # application router configuration
  +-- components # shared components used across the entire application
  |
  +-- features # feature based modules
  |
  +-- hooks # shared hooks used across the entire application
  |
  +-- stores # global state stores
  |
  +-- types # shared types used across the application
  |
  +-- utils # shared utility functions
```

### Features

- Chatbot
- Chat history
- Add a new chat
- Switch between chats
- Delete a chat

## Performance Improvement Ideas

### Frontend Optimizations

- Implement code splitting
- Minimize unnecessary re-renders
- Use React.memo for functional components
- use zustand to store chat history in the local storage
```
