import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { webcrypto } from "crypto";
import { init } from "@sentry/nextjs";

const getPinForUser = (user: string) => "1234";


const decryptSymmetric = async (
  userid: string,
  ciphertext: string,
  iv: string,
  key: string
) => {
  // prepare the secret key
  const secretKey = await webcrypto.subtle.importKey(
    "raw",
    Buffer.from(key, "base64"),
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );

  // decrypt the encrypted text "ciphertext" with the secret key and IV
  const cleartext = await webcrypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: Buffer.from(iv, "base64"),
    },
    secretKey,
    Buffer.from(ciphertext, "base64")
  );

  // decode the text and return it
  return new TextDecoder().decode(cleartext);
};

const isValidCredential = async (
  username: string,
  ciphertext: string,
  iv: string,
  salt: string
) => {
  if (username !== "1") return false;
  const pin = await decryptSymmetric(username, ciphertext, iv, salt);
  return pin === getPinForUser(username);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, ciphertext, iv, key } = req.body;
    if (await isValidCredential(username, ciphertext, iv, key)) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", username, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60, // 1 minute
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ success: true });
    } else res.status(401).json({ error: "Invalid credentials." });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
