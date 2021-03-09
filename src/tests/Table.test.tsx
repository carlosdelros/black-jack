import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../components/Table';

test('renders landing page text', () => {
  render(<Table />);
  const landingPageText = screen.getByText(/Black Jack/i);
  expect(landingPageText).toBeInTheDocument();
});

