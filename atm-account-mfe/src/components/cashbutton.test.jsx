import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import CashButton from './cashbutton'
 
describe('CashButtonLoads', () => {
  it('check for cash button rendering with link', () => {
    render(<CashButton />);
    expect(screen.getByText("Withdraw Cash")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute('href', '/withdrawcash');
  })
})