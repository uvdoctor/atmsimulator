import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

const signIn = (username: String, pin: String) => username == "1" && pin == "1234";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { username, pin } = req.body
    if (signIn(username, pin)) {
      console.log("Going to set cookie as pin is valid");
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', username, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60, // 1 minute
          sameSite: 'strict',
          path: '/'
        })
      );
      res.status(200).json({ success: true });
    }
    else res.status(401).json({ error: 'Invalid credentials.' });
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}