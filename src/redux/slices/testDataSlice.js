import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    data: null,
};

export const testDataSlice = createSlice({
    name: 'testData',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setTestData: (state, action) => {
            state.data = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLoading, setTestData } = testDataSlice.actions

export default testDataSlice.reducer