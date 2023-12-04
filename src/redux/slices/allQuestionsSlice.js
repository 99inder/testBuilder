import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    noOfQuestions: 0,
    questions: [],
}

export const allQuestionsSlice = createSlice({
    name: 'allQuestions',
    initialState,
    reducers: {
        addQuestion: (state, action) => {
            const quesType = action.payload;
            let defaultSkeleton;

            if (quesType === 'category') {
                defaultSkeleton = {
                    type: "category",
                    description: "",
                    categories: ["", ""],
                    items: [{ name: "", category: "" }]
                }
            }
            if (quesType === 'cloze') {
                defaultSkeleton = {
                    type: "cloze",
                    sentence: "",
                    previewSentence: "",
                    options: [],
                }
            }
            if (quesType === 'comprehension') {
                defaultSkeleton = {
                    type: "comprehension",
                    passage: "",
                    mcq: [{
                        ques: "",
                        options: [],
                        answer: ""
                    }],
                }
            }

            // Prepare new Questions array
            let newQuestionsArr = [...state.questions];
            newQuestionsArr.push(defaultSkeleton);

            // update the state
            state.questions = newQuestionsArr;
            state.noOfQuestions += 1;
        },
        updateQuestion: (state, action) => {
            const quesIndex = action.payload.quesIndex;
            const quesData = action.payload.question;

            const newQuestions = [...state.questions]; // Create a shallow copy of the questions array
            newQuestions[quesIndex] = quesData; // Update the specific question at quesIndex

            console.log("DATA>>>",quesData);

            state.questions = newQuestions;
            // console.log("REACHED")
        },
    },
})

// Action creators are generated for each case reducer function
export const { addQuestion, updateQuestion } = allQuestionsSlice.actions

export default allQuestionsSlice.reducer