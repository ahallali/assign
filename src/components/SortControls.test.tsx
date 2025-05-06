import { render, screen, fireEvent } from '@testing-library/react'
import SortControls from './SortControls'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '@/store/slices/todoSlice'

const createTestStore = () => {
  return configureStore({
    reducer: {
      todos: todoReducer,
    },
  })
}

const renderWithRedux = (component: React.ReactElement) => {
  const store = createTestStore()
  return {
    ...render(
      <Provider store={store}>
        {component}
      </Provider>
    ),
    store,
  }
}

describe('SortControls', () => {
  it('renders correctly', () => {
    const { container } = renderWithRedux(<SortControls />)
    expect(container).toMatchSnapshot()
  })

  it('changes sort field when select is changed', () => {
    const { container } = renderWithRedux(<SortControls />)
    const sortFieldSelect = screen.getByLabelText(/sort by/i)
    fireEvent.change(sortFieldSelect, { target: { value: 'createdAt' } })
    expect(container).toMatchSnapshot()
  })

  it('changes sort order when select is changed', () => {
    const { container } = renderWithRedux(<SortControls />)
    const sortOrderSelect = screen.getByLabelText(/order/i)
    fireEvent.change(sortOrderSelect, { target: { value: 'desc' } })
    expect(container).toMatchSnapshot()
  })

  it('displays correct options for sort field', () => {
    renderWithRedux(<SortControls />)
    const sortFieldSelect = screen.getByLabelText(/sort by/i)
    const options = sortFieldSelect.querySelectorAll('option')
    expect(options).toHaveLength(3)
    expect(options[0]).toHaveValue('title')
    expect(options[1]).toHaveValue('createdAt')
    expect(options[2]).toHaveValue('completed')
  })

  it('displays correct options for sort order', () => {
    renderWithRedux(<SortControls />)
    const sortOrderSelect = screen.getByLabelText(/order/i)
    const options = sortOrderSelect.querySelectorAll('option')
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveValue('asc')
    expect(options[1]).toHaveValue('desc')
  })
}) 