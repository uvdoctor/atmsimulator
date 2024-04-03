import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import BalanceButton from './balancebutton'
 
describe('BalanceButtonLoads', () => {
  it('check for balance button rendering with link', () => {
    render(<BalanceButton />);
    expect(screen.getByText("Check account balance")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute('href', '/checkbalance');
  })
})