import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeProvider'

describe('ThemeProvider', () => {
  it('renders children correctly', () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    )

    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('provides theme context', () => {
    const TestComponent = () => {
      const { theme } = useTheme()
      return <div data-testid="theme">{theme}</div>
    }

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  it('toggles theme when theme button is clicked', () => {
    const TestComponent = () => {
      const { theme, ButtonTheme } = useTheme()
      return (
        <div>
          <div data-testid="theme">{theme}</div>
          <button onClick={ButtonTheme}>Toggle Theme</button>
        </div>
      )
    }

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    
    fireEvent.click(screen.getByText('Toggle Theme'))
    
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })
}) 