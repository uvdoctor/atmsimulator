import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import TransactAgain from './transactagain'
 
describe('TransactAgainLinkLoads', () => {
  it('check for transact again link rendering', () => {
    render(<TransactAgain />);
    expect(screen.getByText("Transact again")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute('href', 'http://localhost:3000');
  })
})