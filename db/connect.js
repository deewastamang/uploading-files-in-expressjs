
const mongoose = require('mongoose');

const dbConnect = (URL) => {
    return mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = dbConnect