const axios = require('axios');
const fs = require('fs');

module.exports = {
    wordsEnRaw: fs.readFileSync('words.en.json'),

    checkWordExists: async (word) => {
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

        //remove unneccecery
         resData.green.forEach(g => {
            let currentLetter = userW[g]
            resData.yellow.forEach(y => {
                if (currentLetter == userW[y]) {
                    resData.yellow.splice(y, 1);
                }
            });
        });

        return resData

    },
    generateWordle: function () {
        let wordsEn = JSON.parse(this.wordsEnRaw);
        return "THERE"
    }
}