import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    testTitle: "",
    noOfQuestions: 0,
    questions: [],
}

export const allQuestionsSlice = createSlice({
    name: 'allQuestions',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        updateTestTitle: (state, action) => {
            state.testTitle = action.payload.testTitle
        },
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

            state.questions = newQuestions;
        },
        reorderQuestions: (state, action) => {
            const { sourceIndex, destinationIndex } = action.payload;

            // Ensure valid indices
            if (
                sourceIndex < 0 ||
                sourceIndex >= state.questions.length ||
                destinationIndex < 0 ||
                destinationIndex >= state.questions.length
            ) {
                return;
            }

            // Reorder questions array
            const reorderedQuestions = [...state.questions];
            const [movedQuestion] = reorderedQuestions.splice(sourceIndex, 1);
            reorderedQuestions.splice(destinationIndex, 0, movedQuestion);

            state.questions = reorderedQuestions;
        },
        deleteQuestion: (state, action) => {
            const quesIndex = action.payload;

            // Ensure valid index
            if (quesIndex < 0 || quesIndex >= state.questions.length) {
                return;
            }

            // Remove the question at quesIndex
            const updatedQuestions = state.questions.filter((_, index) => index !== quesIndex);

            state.questions = updatedQuestions;
            state.noOfQuestions = updatedQuestions.length;
        },
        resetTestBuilderState: (state) => {
            state.testTitle = "";
            state.noOfQuestions = 0;
            state.questions = [];
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLoading, updateTestTitle, addQuestion, updateQuestion, reorderQuestions, deleteQuestion, resetTestBuilderState } = allQuestionsSlice.actions

export default allQuestionsSlice.reducer