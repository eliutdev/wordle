const express = require('express')
var cors = require('cors')
const fs = require('fs');
const app = express()
app.use(cors())
const axios = require('axios');
var dbb = require('./db.js')
var helperW = require('./helper.wordle.js')


app.get('/', async (req, res) => {
  res.send("OK")
})

app.get('/start-game/:id', (req, res) => {
  let { id } = req.params;
  let result = dbb.session(id)

  if (result == undefined) {
    const word = helperW.generateWordle()
    const session = { id, word }
    dbb.add(session)
    res.json({ result: "success", ...session });
  } else res.json({ result: "fail" });
})

app.get('/check-word/:id/:word', async (req, res) => {
  let { id } = req.params;
  let { word } = req.params;

  let exists = await helperW.checkWordExists(word);
  if (exists) {
    let result = dbb.session(id)
    if (result == undefined) {
      res.json({ result: "fail", info: "Session/id not found" });

    } else {
      let resData = await helperW.checkWordCorrect(word, result.word)
      res.json({ result: "success", data: resData });
    }

  } else {
    res.json({ result: "fail", info: "Words doesn't exist" });

  }

})

let wordsEnRaw;
app.listen(3001, async () => {
  wordsEnRaw = fs.readFileSync('words.en.json');
  console.log('Starting!')
})

