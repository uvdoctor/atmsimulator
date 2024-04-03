import { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  if (req.method === 'POST') {
    // DESTROY COOKIE
    cookies().delete('token');
    res.status(200).json({ logout: true })

  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
