import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import Balance from './balance'
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {    
    fetch.resetMocks();
});

describe('BalanceLoadsWithError', () => {
    it('check for balance error when no user is found', async() => {
        fetch.mockResponseOnce(JSON.stringify({ message: "No active user" }));
        render(<Balance />);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(await screen.findByText("No active user")).toBeInTheDocument();
    })
})

describe('BalanceLoadsWithAccountAndAmount', () => {
    it('check for account and balance when user is found', async() => {
        fetch.mockResponseOnce(JSON.stringify({ account: "A123", balance: 500 }));
        render(<Balance />);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(await screen.findByText("Account A123 has balance of 500 pounds")).toBeInTheDocument();
    })
})