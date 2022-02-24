const express = require('express')
var cors = require('cors')
const fs = require('fs');
const app = express()
app.use(cors())
const axios = require('axios');
var dbb = require('./db.js')
var helperW = require('./helper.wordle.js')
let db = [{
  id: "0e79837d-0367-418b-a1cd-67d6c2f53393",
  word: "EARTH"
}]

app.get('/', async (req, res) => {
  // console.log(dbb.session("0e79837d-0367-418b-a1cd-67d6c2f53393"));
  // console.log(dbb.db());
  console.log(helperW.checkWordCorrect("donda", "words"));
  // console.log(await helperW.checkWordExists("hello"));
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
      // let resData = { green: [], yellow: [] }
      // // check greens
      // for (let i = 0; i < word.length; i++) {
      //   // const db = array[i];
      //   if (word[i] == result.word[i]) {
      //     resData.green.push(i)
      //   }
      // }

      // // check yellows
      // for (let i = 0; i < word.length; i++) {
      //   // const db = array[i];
      //   if (result.word.includes(word[i])) {
      //     resData.yellow.push(i)
      //   }
      // }

      let resData = helperW.checkWordCorrect(word, result.word)
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

