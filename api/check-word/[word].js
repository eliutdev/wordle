import cookie from "cookie";
import wordle from "../../helper.wordle";

const handler = async (req, res) => {
  const { id, word } = req.query;
  const exists = await wordle.checkWordExists(word);
  if (exists) {
    const cookies = cookie.parse(req.headers.cookie || "");
    const result = JSON.parse(cookies[id]);
    if (!result) {
      res.json({ result: "fail", info: "Session not found" });
    } else {
      const resData = await wordle.checkWordCorrect(word, result.word);
      res.json({ result: "success", data: resData });
    }
  } else {
    res.json({ result: "fail", info: "Word not found" });
  }
};

export default handler;
