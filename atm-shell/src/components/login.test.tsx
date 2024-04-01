import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import Login from './login'
 
describe('Login', () => {
  it('check for login text', () => {
    render(<Login />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  })
})