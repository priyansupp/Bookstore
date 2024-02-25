const mongoose = require('mongoose');

class Database {

    constructor() {
        this._connect();
    }
    URL = "mongodb://localhost:27017/";

    _connect() {
        mongoose.connect(process.env.URL || this.URL)
        .then(() => {
            const db = mongoose.connection.useDb('data');
            console.log(`The connection to database : ${db.name} has been established`);
        })
        .catch(err => {
            console.log(`The error is : ${err}`);
        })
    }
}


// export a new object of class Database(will work as a Singleton)
module.exports = new Database();
