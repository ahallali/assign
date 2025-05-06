# Todo App

A modern, responsive Todo application built with Next.js, React, Redux, and TypeScript.

## Features

- Create, read, update, and delete todos
- Sort todos by different criteria
- Dark/Light theme support
- Responsive design
- Form validation
- User authentication
- Persistent storage

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## How to Run

### Development Mode

1. Clone the repository:
```bash
git clone https://github.com/ahallali/assign.git
cd todo_app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Running Tests

1. Run all tests:
```bash
npm test
```

2. Run tests with coverage report:
```bash
npm run test:coverage
```

3. Run tests in watch mode (useful during development):
```bash
npm run test:watch
```

### Code Quality

1. Run ESLint to check code quality:
```bash
npm run lint
```

2. Fix ESLint issues automatically:
```bash
npm run lint -- --fix
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run test:watch` - Run tests in watch mode

## Testing

The project uses Jest and React Testing Library for testing. Here's how to run the tests:

1. Run all tests:
```bash
npm test
```

2. Run tests with coverage:
```bash
npm run test:coverage
```

3. Run tests in watch mode:
```bash
npm run test:watch
```

### Test Structure

- `src/app/*.test.tsx` - Tests for Next.js pages
- `src/components/*.test.tsx` - Tests for React components
- `src/lib/*.test.ts` - Tests for utility functions
- `src/store/*.test.ts` - Tests for Redux store and slices

### Testing Guidelines

1. Component Tests:
   - Test component rendering
   - Test user interactions
   - Test component state changes
   - Test component props
   - Test accessibility

2. Page Tests:
   - Test page rendering
   - Test page navigation
   - Test page state management
   - Test page data fetching

3. Utility Tests:
   - Test function inputs and outputs
   - Test edge cases
   - Test error handling

4. Store Tests:
   - Test action creators
   - Test reducers
   - Test selectors
   - Test async actions

### Mocking

The project uses Jest's mocking capabilities for:
- External dependencies
- API calls
- Browser APIs
- React components

Example of mocking a component:
```typescript
jest.mock('@/components/ComponentName', () => ({
  ComponentName: ({ children }) => <div data-testid="mocked-component">{children}</div>
}))
```

## Project Structure

```
todo_app/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   ├── store/           # Redux store
│   └── types/           # TypeScript types
├── public/              # Static files
├── tests/              # Test utilities
└── package.json        # Project dependencies
```




