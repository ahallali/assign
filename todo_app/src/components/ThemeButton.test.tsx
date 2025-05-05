import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from './ThemeProvider'
import ThemeButton from './ThemeButton'
import '@testing-library/jest-dom'

describe('ThemeButton', () => {
  it('renders theme button with correct initial icon', () => {
    render(
      <ThemeProvider>
        <ThemeButton />
      </ThemeProvider>
    )

    const button = screen.getByRole('button', { name: /button theme/i })
    expect(button).toBeInTheDocument()
    expect(button.querySelector('svg')).toHaveClass('text-gray-800')
  })

  it('toggles theme when clicked', async () => {
    render(
      <ThemeProvider>
        <ThemeButton />
      </ThemeProvider>
    )

    const button = screen.getByRole('button', { name: /button theme/i })
    fireEvent.click(button)

    expect(button.querySelector('svg')).toHaveClass('text-yellow-500')

    fireEvent.click(button)
    expect(button.querySelector('svg')).toHaveClass('text-gray-800')
  })

  it('has correct accessibility attributes', () => {
    render(
      <ThemeProvider>
        <ThemeButton />
      </ThemeProvider>
    )

    const button = screen.getByRole('button', { name: /button theme/i })
    expect(button).toHaveAttribute('aria-label', 'Button theme')
  })
}) 