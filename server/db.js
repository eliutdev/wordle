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


module.exports = new function () {
    this.data = [{
        id: "0e79837d-0367-418b-a1cd-67d6c2f53393",
        word: "EARTH"
    }]

    this.db = function () {
        return this.data;
    }
    this.add = (session) => {
        console.log(this.data);
        this.data.push(session)
        return true;
    }
    this.session = function (id) {
        return this.data.find(el => el.id === id)
    }

}


let gg = {
    data: [{
        id: "0e79837d-0367-418b-a1cd-67d6c2f53393",
        word: "EARTH"
    }],

    db: () => {
        return this.data;
    },
    add: (session) => {
        console.log(this.data);
        this.data.push(session)
        return true;
    },
    session: function (id) {
        return this.data.find(el => el.id === id)
    }
}