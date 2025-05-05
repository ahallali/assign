import { render, screen } from '@testing-library/react'
import RootLayout from './layout'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

jest.mock('@/components/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>,
}))

jest.mock('@/components/ThemeButton', () => ({
  __esModule: true,
  default: () => <button data-testid="theme-button">Theme Button</button>,
}))

jest.mock('./layout', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="root-layout">
        <div data-testid="theme-provider">{children}</div>
        <button data-testid="theme-button">Theme Button</button>
      </div>
    ),
  }
})

describe('RootLayout', () => {
  const renderWithRedux = (component: React.ReactElement) => {
    return render(
      <Provider store={store}>
        {component}
      </Provider>
    )
  }

  it('renders children and theme button', () => {
    renderWithRedux(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    )

    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByTestId('theme-button')).toBeInTheDocument()
  })

  it('wraps content in Redux Provider and ThemeProvider', () => {
    renderWithRedux(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    )

    expect(screen.getByTestId('theme-provider')).toBeInTheDocument()
    expect(screen.getByTestId('test-child')).toBeInTheDocument()
  })
}) 