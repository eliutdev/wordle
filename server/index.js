const express = require('express')
var cors = require('cors')
const fs = require('fs');
const app = express()
app.use(cors())
const axios = require('axios');


let db = [{
  id: "0e79837d-0367-418b-a1cd-67d6c2f53393",
  word: "EARTH"
}]

let generateWordle = () => {
  let wordsEn = JSON.parse(wordsEnRaw);
  return wordsEn[0]
}
let checkWordExists = async (word) => {
  try {
    const resp = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + word);
    return true
  } catch (err) {
    // Handle Error Here
    return false
  }
}

app.get('/start-game/:id', (req, res) => {
  let { id } = req.params;
  let result = db.find(el => el.id === id)

  if (result == undefined) {
    const word = generateWordle()
    const session = { id, word }
    db.push(session)
    res.json({ result: "success", ...session });
  } else res.json({ result: "fail" });
})

app.get('/check-word/:id/:word', (req, res) => {
  let { id } = req.params;
  let { word } = req.params;

  let result = db.find(el => el.id === id)
  if (result == undefined) {
    res.json({ result: "fail" });
  } else {

  }


  res.send(word);
})

let wordsEnRaw;
app.listen(3001, async () => {
  wordsEnRaw = fs.readFileSync('words.en.json');
  console.log(await checkWordExists("hello"));
  console.log('Starting!')
})

