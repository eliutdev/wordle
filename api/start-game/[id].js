import { serialize } from "cookie";
import wordle from "../../helper.wordle.js";

const handler = (req, res) => {
  const { id } = req.query;
  const word = wordle.generateWordle();
  const session = { id, word };
  res.setHeader(
    "Set-Cookie",
    serialize(id, JSON.stringify(session), {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );
  res.status(200).json({
    result: "success",
    ...session,
  });
};

export default handler;
