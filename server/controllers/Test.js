const TestModel = require('../models/TestOverview');
const QuestionModel = require('../models/Question');

function stripHtmlAndDecodeEntities(inputString) {
    // Decode HTML entities
    const decodedString = inputString.replace(/&nbsp;/g, ' ')
        .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));

    // Remove HTML tags
    const strippedString = decodedString.replace(/<[^>]*>/g, '');

    return strippedString;
}


const createTest = async (req, res) => {
    try {
        const inputData = req.body;

        if (!inputData)
            return res.status(400).json({
                success: false,
                message: "Please provide the data"
            })

        // Step 1: Extract and create questions
        const questionData = inputData.questions.map(question => {

            return {
                type: question.type,
                description: question.description,
                categories: question.categories,
                items: question.items, // Ensure items are included
                sentence: question.sentence && stripHtmlAndDecodeEntities(question.sentence),
                previewSentence: question.previewSentence && stripHtmlAndDecodeEntities(question.previewSentence),
                options: question.options,
                passage: question.passage,
                mcq: question.mcq,
            };
        });

        const questions = await QuestionModel.create(questionData);

        // Step 2: Create the test with references to the questions
        const newTest = await TestModel.create({
            testTitle: inputData.testTitle,
            noOfQuestions: inputData.noOfQuestions,
            questions: questions.map(question => question._id),
        });

        return res.status(201).json({
            success: true,
            message: 'Data stored successfully',
            data: newTest
        });
    } catch (error) {
        console.error('Error storing data:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

const fetchTestsList = async (req, res) => {
    try {

        const testsList = await TestModel.find().select({ questions: 0, __v: 0 });

        return res.status(200).json({
            success: true,
            message: 'Data stored successfully',
            data: testsList
        });
    } catch (error) {
        console.error('Error storing data:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

const fetchTest = async (req, res) => {
    try {
        let testId = req.params.testId;

        if (!testId) {
            return res.status(400).json({
                success: false,
                message: "TestId not received"
            })
        }

        const testData = await TestModel.findById(testId)
            .populate('questions')
            .exec();

        if (!testData) {
            return res.status(404).json({ success: false, message: 'Test not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Test data fetched successfully',
            data: testData
        });
    } catch (error) {
        console.error('Error storing data:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

module.exports = {
    createTest,
    fetchTestsList,
    fetchTest
};
