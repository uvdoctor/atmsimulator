import cookie from "cookie";

const getAccountNumber = (username) => (username === "1" ? "A1234" : null);

const getBalance = (accountNumber) => (accountNumber === "A1234" ? 5000 : 0);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const username = req.cookies["token"];
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: new Date(0), // expire cookie
        sameSite: "strict",
        path: "/",
      })
    );
    const accountNumber = getAccountNumber(username);
    if (!accountNumber) {
      res
        .status(404)
        .json({
          message:
            "No active savings or current account associated with this user. Please contact the bank for further assistance.",
        });
    } else {
      res
        .status(200)
        .json({ account: accountNumber, balance: getBalance(accountNumber) });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
