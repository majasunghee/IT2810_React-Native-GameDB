const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    msrp: {
        type: Number,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    developer: {
        type: String,
        required: true
    },
    esrb: {
        type: String,
        required: true
    },
    releasedate: {
        type: String,
        required: true
    },
    romfilesize: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    storelink: {
        type: String,
        required: false
    },
    officialsite: {
        type: String,
        required: false
    }
}); 

module.exports = mongoose.model("consolegames", gameSchema);
