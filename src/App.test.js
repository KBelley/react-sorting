import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders new array button', () => {
  render(<App />);
  const linkElement = screen.getByText(/new array/i);
  expect(linkElement).toBeInTheDocument();
});
