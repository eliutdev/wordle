const axios = require("axios");
const fs = require("fs");
const { join } = require("path");

module.exports = {
  wordsEnRaw: fs.readFileSync(join(__dirname, "words.en.json")),
  checkWordExists: async (word) => {
    try {
      const { data } = await axios.get(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
      );
      return Array.isArray(data);
    } catch (_) {
      return false;
    }
  },
  checkWordCorrect: async (userW, correctW) => {
    const resData = { green: [], yellow: [] };
    // check greens
    for (let i = 0; i < userW.length; i++) {
      // const db = array[i];
      if (userW[i] == correctW[i]) {
        resData.green.push(i);
      }
    }
    // check yellows
    for (let i = 0; i < userW.length; i++) {
      // const db = array[i];
      if (correctW.includes(userW[i])) {
        resData.yellow.push(i);
      }
    }
    return resData;
  },
  generateWordle: function () {
    const wordsEn = JSON.parse(this.wordsEnRaw);
    return wordsEn[Math.floor(Math.random() * wordsEn.length)].toUpperCase();
  },
};
