import { render, screen, waitFor, fireEvent } from '@/utils/test-utils'
import TodoForm from '@/components/TodoForm'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react'
import { RootState } from '@/store/store'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

const renderWithRedux = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  )
}

describe('TodoForm', () => {
  const initialState: RootState = {
    todos: {
      todos: [],
      filter: 'all',
      searchQuery: '',
      sortField: 'createdAt',
      sortOrder: 'desc',
    },
  }

  it('renders the form correctly', () => {
    render(<TodoForm />, { preloadedState: initialState })
    
    expect(screen.getByPlaceholderText('Enter a new task')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add new todo/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<TodoForm />, { preloadedState: initialState })
    
    const addButton = screen.getByRole('button', { name: /add new todo/i })
    
    await act(async () => {
      await userEvent.click(addButton)
    })

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add new todo/i })).toBeDisabled()
    })
  })

  it('submits the form with valid data', async () => {
    const { store } = render(<TodoForm />, { preloadedState: initialState })
    
    const input = screen.getByPlaceholderText('Enter a new task')
    const addButton = screen.getByRole('button', { name: /add new todo/i })

    await act(async () => {
      await userEvent.type(input, 'Test Todo')
      await userEvent.click(addButton)
    })

    await waitFor(() => {
      const state = store.getState() as RootState
      expect(state.todos.todos).toHaveLength(1)
      expect(state.todos.todos[0].title).toBe('Test Todo')
    })
  })

  it('clears the form after successful submission', async () => {
    render(<TodoForm />, { preloadedState: initialState })
    
    const input = screen.getByPlaceholderText('Enter a new task')
    const addButton = screen.getByRole('button', { name: /add new todo/i })

    await act(async () => {
      await userEvent.type(input, 'Test Todo')
      await userEvent.click(addButton)
    })

    await waitFor(() => {
      expect(input).toHaveValue('')
    })
  })

  it('renders correctly', () => {
    const { container } = renderWithRedux(<TodoForm />)
    expect(container).toMatchSnapshot()
  })

  it('renders with error state', async () => {
    const { container } = renderWithRedux(<TodoForm />)
    const submitButton = screen.getByRole('button', { name: /add new todo/i })
    fireEvent.click(submitButton)
    expect(container).toMatchSnapshot()
  })

  it('renders with input value', () => {
    const { container } = renderWithRedux(<TodoForm />)
    const input = screen.getByPlaceholderText(/enter a new task/i)
    fireEvent.change(input, { target: { value: 'Test Todo' } })
    expect(container).toMatchSnapshot()
  })
}) 