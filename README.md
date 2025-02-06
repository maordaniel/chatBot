# Chat bot

## Getting Started

1. Clone the repository
2. Install dependencies using yarn

```bash
yarn install
```

3. Create a `.env` file in the root of the project and add the following:

```bash
VITE_API_KEY=your_api_key
```

4. Start the development server

```bash
yarn dev
```

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
