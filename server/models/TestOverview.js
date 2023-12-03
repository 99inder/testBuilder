const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    testTitle: {
        type: String,
        required: true,
        trim: true,
    },
    noOfQuestions: {
        type: Number,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Question"
    }]
});

module.exports = mongoose.model("Test", TestSchema);