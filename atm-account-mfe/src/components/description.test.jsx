import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Description from './description'
 
describe('Description', () => {
  it('check for description', () => {
    render(<Description />);
    expect(screen.getByText("Account Balance MFE")).toBeInTheDocument();
  })
})