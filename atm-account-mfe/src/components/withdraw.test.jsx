import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Withdraw from './withdraw'
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {    
    fetch.resetMocks();
});

describe('WithdrawSucceeds', () => {
    it('user is able to withdraw the input amount', async () => {
        fetch.mockResponseOnce(JSON.stringify({ oldBalance: 500, withdrawAmt: 100, newBalance: 400 }));
        render(<Withdraw />);
        fireEvent.click(screen.getByPlaceholderText("10"), { target: { value: 100 } });
        fireEvent.click(screen.getByText("Withdraw"));
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(await screen.findByText("You have withdrawn 100 pounds. New balance in your account is 400 pounds.")).toBeInTheDocument();
    })
})

/*describe('WithdrawFails', () => {
    it('user is unable to withdraw amount which is not a multiple of 10', async () => {
        fetch.mockResponseOnce(JSON.stringify({ message: "Withdraw failed" }));
        render(<Withdraw />);
        fireEvent.click(screen.getByPlaceholderText("10"), { target: { value: 25 } });
        fireEvent.click(screen.getByText("Withdraw"));
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(await screen.findByText("Withdraw failed")).toBeInTheDocument();
    })
})*/