# Personal Finance Tracker

A React-based personal finance management application built with TypeScript, Tailwind CSS, and React Router.

## Features

- User authentication (login/register)
- Dashboard with financial overview
- Transaction tracking (income and expenses)
- Summary cards showing balance, income, and expenses
- Responsive design using Tailwind CSS

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- Context API for state management

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -i src/index.css
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── context/        # React Context providers
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
├── styles/         # Additional CSS files
├── App.tsx         # Main application component
├── index.tsx       # Entry point
└── ...
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## API Integration

To connect to a real backend:

1. Update the auth functions in `src/context/AuthContext.tsx`
2. Modify the transaction functions to use your API endpoints
3. Update the mock data in the components to use real API calls

## Customization

- Update the color scheme by modifying `tailwind.config.js`
- Add new components to the `src/components` directory
- Create additional pages in the `src/pages` directory
- Add custom styles in `src/index.css` or create new CSS files in `src/styles`