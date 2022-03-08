const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const db = require("./db.js");
const helperW = require("./helper.wordle.js");

app.get("/", async (_, res) => {
  res.send("OK");
});

app.get("/start-game/:id", (req, res) => {
  const { id } = req.params;
  const result = db.session(id);
  if (!result) {
    const word = helperW.generateWordle();
    const session = { id, word };
    db.add(session);
    res.json({ result: "success", ...session });
  } else res.json({ result: "fail" });
});

app.get("/check-word/:id/:word", async (req, res) => {
  const { id } = req.params;
  const { word } = req.params;
  const exists = await helperW.checkWordExists(word);
  console.log("EXISTS: ", exists);
  if (exists) {
    const result = db.session(id);
    if (!result) {
      res.json({ result: "fail", info: "Session not found" });
    } else {
      const resData = await helperW.checkWordCorrect(word, result.word);
      res.json({ result: "success", data: resData });
    }
  } else {
    res.json({ result: "fail", info: "Word not found" });
  }
});

app.listen(3001, async () => {
  console.log("Starting!");
});
