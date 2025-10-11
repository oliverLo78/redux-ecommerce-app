import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryMenu from '../components/CategoryMenu';
import { updateCurrentCategory } from '../redux/slices/categorySlice';

// Mock the Apollo client, specifically the `useQuery` hook and `gql` function,
// to control the data returned in tests and prevent real API calls.
jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: (strings) => (Array.isArray(strings) ? strings.join('') : strings),
}));

// Mock the React-Redux hooks `useDispatch` and `useSelector`
// so we can test component logic that interacts with the Redux store
// without using the real store.
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock the `idbPromise` helper function to prevent interactions with the
// IndexedDB database and provide a predictable response for testing
jest.mock('../utils/helpers', () => ({
  idbPromise: jest.fn(() => Promise.resolve([])),
}));

const { useQuery } = require('@apollo/client');
const { useDispatch, useSelector } = require('react-redux');
const { idbPromise } = require('../utils/helpers');

afterEach(() => {
  cleanup();
});

describe('CategoryMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    idbPromise.mockResolvedValue([]);
  });
  // Tests the behavior of the CategoryMenu component when no categories are available
  it('shows a fallback message when no categories are available', () => {
    // ARRANGE
    // Mock the Redux state to return an empty array for categories.
    useSelector.mockImplementation(() => []);
    // Mock the dispatch function.
    useDispatch.mockReturnValue(jest.fn());
    // Mock the GraphQL query to return no data and indicate loading is complete.
    useQuery.mockReturnValue({ loading: false, data: null });

    render(<CategoryMenu />);

    // ASSERT
    // Expect the "No categories available" message to be present in the document.
    expect(screen.getByText(/No categories available/i)).toBeInTheDocument();
  });

  // Tests that the CategoryMenu renders categories and dispatches an action when a category is clicked
   it('renders categories and dispatches the current category when clicked', async () => {
    // ARRANGE
    const categories = [
      { _id: '1', name: 'Food' },
      { _id: '2', name: 'Household Supplies' },
    ];
    // Mock the dispatch function
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    // Mock the Redux state to provide a predefined list of categories.
    useSelector.mockImplementation(() => categories);
    // Mock the GraphQL query to return the predefined category data
    useQuery.mockReturnValue({ loading: false, data: { categories } });

    render(<CategoryMenu />);

    const user = userEvent.setup();
    // Simulate a click on the 'Food' category.
    await user.click(screen.getByRole('button', { name: /Food/i }));
    
    // ASSERT
    // Expect the dispatch function to have been called with the correct action
    expect(dispatchMock).toHaveBeenCalledWith(updateCurrentCategory(categories[0]));
  });
});