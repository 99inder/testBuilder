import { configureStore } from '@reduxjs/toolkit'
import allQuestionsReducer from './slices/allQuestionsSlice'
import testDataSlice from './slices/testDataSlice';

export const store = configureStore({
    reducer: {
        allQuestions: allQuestionsReducer,
        testData: testDataSlice,
    },
});