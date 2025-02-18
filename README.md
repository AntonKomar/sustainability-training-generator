# AI-Driven Sustainability Training Generator

An MVP web application that generates customized sustainability training outlines using Google's Gemini AI.

## Approach

This application was built as a minimal viable product (MVP) to demonstrate the integration of frontend, backend, and AI capabilities. The solution uses React for the frontend to provide a clean user interface, Node.js with Express for the backend API, MongoDB for data persistence, and Google's Gemini AI for generating training outlines.

To ensure quality AI output, the implementation includes:
- Structured prompt engineering with clear sections and requirements
- Industry-specific context incorporation
- Consistent output format with predefined sections
- Error handling and validation

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   # Frontend
   cd client
   npm install

   # Backend
   cd ../server
   npm install
   ```

3. Create `.env` files in both client and server directories
4. Start the application:
   ```bash
   # Backend
   cd server
   npm run dev

   # Frontend
   cd client
   npm start
   ```

## Technologies Used
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: MongoDB
- AI: Google Gemini AI