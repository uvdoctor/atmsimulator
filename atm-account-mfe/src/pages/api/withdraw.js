import cookie from 'cookie'

const getAccountNumber = (username) => username === "1" ? "A1234" : null;

const getBalance = (accountNumber) => accountNumber === "A1234" ? 5000 : 0;

const isInvalidWithdrawalAmt = (withdrawAmt) => isNaN(withdrawAmt) || withdrawAmt < 10 || withdrawAmt > 500 || withdrawAmt % 10 !== 0;

export default async function handler(
  req,
  res
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
        return;
    }
    const username = req.cookies['token'];
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: new Date(0), // expire cookie
          sameSite: 'strict',
          path: '/'
        })
      );
    const { reqAmt } = req.body;
    if (!reqAmt) {
        res.status(400).json({ message: 'No cash withdrawal amount found. Please log in again and retry.' });
        return;
    }
    const withdrawAmt = parseInt(reqAmt);
    if (isInvalidWithdrawalAmt(withdrawAmt)) {
        res.status(400).json({ message: 'Cash withdrawal amount should be a minimum of 10 pounds, or a multiple of 10 up to 500 pounds. Please log in again and request.' });
        return;
    }
    const accountNumber = getAccountNumber(username);
    if (!accountNumber) {
        res.status(404).json({ message: 'No active savings or current account associated with this user. Please contact the bank for further assistance.' });
        return;
    }
    const balance = getBalance(accountNumber);
    if (withdrawAmt > balance) {
        res.status(400).json({ message: `Cash withdrawal amount is more than the account balance of ${balance} pounds. Please log in again and request an amount less than the account balance.` });
        return;
    }
    res.status(200).json({ account: accountNumber, oldBalance: balance, withdrawAmt: withdrawAmt, newBalance: balance - withdrawAmt }); 
}