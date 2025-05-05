import { render, screen, fireEvent } from '@/utils/test-utils'
import SortControls from './SortControls'
import { setSortField, setSortOrder } from '@/store/slices/todoSlice'

describe('SortControls', () => {
  const initialState = {
    todos: {
      todos: [],
      filter: 'all',
      searchQuery: '',
      sortField: 'createdAt',
      sortOrder: 'asc'
    }
  }

  it('renders sort controls correctly', () => {
    render(<SortControls />, { preloadedState: initialState })
    
    expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/order/i)).toBeInTheDocument()
  })

  it('changes sort field when select is changed', async () => {
    const { store } = render(<SortControls />, { preloadedState: initialState })
    
    const sortFieldSelect = screen.getByLabelText(/sort by/i)
    fireEvent.change(sortFieldSelect, { target: { value: 'title' } })
    
    expect(store.getState().todos.sortField).toBe('title')
  })

  it('changes sort order when select is changed', async () => {
    const { store } = render(<SortControls />, { preloadedState: initialState })
    
    const sortOrderSelect = screen.getByLabelText(/order/i)
    fireEvent.change(sortOrderSelect, { target: { value: 'desc' } })
    
    expect(store.getState().todos.sortOrder).toBe('desc')
  })

  it('displays correct options for sort field', () => {
    render(<SortControls />, { preloadedState: initialState })
    
    const sortFieldSelect = screen.getByLabelText(/sort by/i)
    const options = sortFieldSelect.querySelectorAll('option')
    
    expect(options).toHaveLength(3)
    expect(options[0]).toHaveValue('title')
    expect(options[1]).toHaveValue('createdAt')
    expect(options[2]).toHaveValue('completed')
  })

  it('displays correct options for sort order', () => {
    render(<SortControls />, { preloadedState: initialState })
    
    const sortOrderSelect = screen.getByLabelText(/order/i)
    const options = sortOrderSelect.querySelectorAll('option')
    
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveValue('asc')
    expect(options[1]).toHaveValue('desc')
  })
}) 