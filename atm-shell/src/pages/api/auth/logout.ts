import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  if (req.method === 'POST') {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 0, // expire cookie
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({ logout: true })

  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
