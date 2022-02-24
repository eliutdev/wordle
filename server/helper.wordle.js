const axios = require('axios');
const fs = require('fs');

module.exports = {
    wordsEnRaw: fs.readFileSync('words.en.json'),

    checkWordExists: async (word) => {
        return true

        try {
            await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + word);
            return true
        } catch (err) {
            console.log(err);
            return false
        }
    },
    checkWordCorrect: async (userW, correctW) => {

        let resData = { green: [], yellow: [] }
        // check greens
        for (let i = 0; i < userW.length; i++) {
            // const db = array[i];
            if (userW[i] == correctW[i]) {
                resData.green.push(i)
            }
        }

        // check yellows
        for (let i = 0; i < userW.length; i++) {
            // const db = array[i];
            if (correctW.includes(userW[i])) {
                resData.yellow.push(i)
            }
        }

        console.log(resData);
        return resData

    },
    generateWordle: function () {
        let wordsEn = JSON.parse(this.wordsEnRaw);
        return wordsEn[Math.floor(Math.random() * wordsEn.length)].toUpperCase();
    }
}