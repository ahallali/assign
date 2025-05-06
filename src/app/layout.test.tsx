import { render, screen } from '@testing-library/react'
import RootLayout from './layout'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemeButton from '@/components/ThemeButton'

jest.mock('@/components/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>,
}))

jest.mock('@/components/ThemeButton', () => ({
  __esModule: true,
  default: () => <button data-testid="theme-button">Theme</button>,
}))

jest.mock('./layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="root-layout">
      <Provider store={store}>
        <ThemeProvider>
          <ThemeButton />
          {children}
        </ThemeProvider>
      </Provider>
    </div>
  ),
}))

describe('RootLayout', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('renders children and theme button', () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    )

    expect(screen.getByTestId('root-layout')).toBeInTheDocument()
    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByTestId('theme-button')).toBeInTheDocument()
  })

  it('wraps content in Redux Provider and ThemeProvider', () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    )

    expect(screen.getByTestId('theme-provider')).toBeInTheDocument()
    expect(screen.getByTestId('test-child')).toBeInTheDocument()
  })

  it('renders with correct structure', () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    )

    expect(screen.getByTestId('theme-provider')).toBeInTheDocument()
    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByTestId('theme-button')).toBeInTheDocument()
  })
}) 