import { configureStore } from '@reduxjs/toolkit'
import allQuestionsReducer from './slices/allQuestionsSlice'

export const store = configureStore({
    reducer: {
        allQuestions: allQuestionsReducer
    },
});