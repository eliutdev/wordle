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
  return "THERE"
}
let checkWordExists = async (word) => {
  try {
    await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + word);
    return true
  } catch (err) {
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

app.get('/check-word/:id/:word', async (req, res) => {
  let { id } = req.params;
  let { word } = req.params;

  let exists = await checkWordExists(word);
  if (exists) {
    let result = db.find(el => el.id === id)
    if (result == undefined) {
      res.json({ result: "fail", info: "Session/id not found" });

    } else {
      console.log(result);
      let resData = { green: [], yellow: [] }
      // check greens
      for (let i = 0; i < word.length; i++) {
        // const db = array[i];
        if (word[i] == result.word[i]) {
          resData.green.push(i)
        }
      }

      // check yellows
      for (let i = 0; i < word.length; i++) {
        // const db = array[i];
        if (result.word.includes(word[i])) {
          resData.yellow.push(i)
        }
      }


      res.json({ result: "success", data: resData });
    }

  } else {
    res.json({ result: "fail", info: "Words doesn't exist" });

  }



})

let wordsEnRaw;
app.listen(3001, async () => {
  wordsEnRaw = fs.readFileSync('words.en.json');
  console.log(await checkWordExists("hello"));
  console.log('Starting!')
})

