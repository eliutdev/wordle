const res = require("express/lib/response");

class DB {
    constructor() {
        this.data = [{
            id: "0e79837d-0367-418b-a1cd-67d6c2f53393",
            word: "EARTH"
        }]
    };

    //Getters
    get db() {
        return this.data;
    }
    // get session(id) {
    //     return this.findSession(id);
    // }

    //Methods
    findSession(id) {
        return this.db.find(el => el.id === id)
    }
};


function DDBB() {
    this.data = [{
        id: "0e79837d-0367-418b-a1cd-67d6c2f53393",
        word: "EARTH"
    }]

    function db() {
        return this.data;
    }
    function session(id) {
        return this.findSession(id);
    }

    function findSession(id) {
        return this.db.find(el => el.id === id)
    }

}


module.exports = {
    data: [{
        id: "0e79837d-0367-418b-a1cd-67d6c2f53393",
        word: "EARTH"
    }],
    db: () => {
        return this.data;
    },
    add: (session) => {
        this.data.push(session)
        return true;
    },
    session: function (id) {
        return this.data.find(el => el.id === id)
    }
}