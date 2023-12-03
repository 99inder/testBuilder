const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    category: String
});

const mcqSchema = new mongoose.Schema({
    ques: String,
    options: [String],
    answer: String
});

const questionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['category', 'cloze', 'comprehension']
    },
    description: String,
    categories: [String],
    items: [itemSchema],
    sentence: String,
    previewSentence: String,
    options: [String],
    passage: String,
    mcq: [mcqSchema]
});

module.exports = mongoose.model('Question', questionSchema);
