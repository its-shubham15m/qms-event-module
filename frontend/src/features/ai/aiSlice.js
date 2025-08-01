import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AI_API_URL = 'http://localhost:8000/api/assist';

export const postAiQuery = createAsyncThunk('ai/postQuery', async ({ query }, { rejectWithValue }) => {
    try {
        const response = await axios.post(AI_API_URL, { query });
        return response.data.response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    conversation: [
        {
            sender: 'ai',
            type: 'insight', // A custom type for specific styling
            title: 'Audit Insights',
            text: "Ask me to 'find all supplier audits due next quarter', 'show overdue findings from internal audits', or 'generate a checklist for an ISO 13485 audit'."
        },
        {
            sender: 'ai',
            type: 'alert', // A custom type for the alert styling
            title: 'Proactive Alert',
            text: 'The annual internal audit for the Manufacturing department is overdue by 30 days. Recommend scheduling immediately.'
        }
    ],
    status: 'idle',
    error: null,
};

const aiSlice = createSlice({
    name: 'ai',
    initialState,
    reducers: {
        addUserMessage: (state, action) => {
            state.conversation.push({ sender: 'user', text: action.payload });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postAiQuery.pending, (state) => { state.status = 'loading'; })
            .addCase(postAiQuery.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.conversation.push({ sender: 'ai', text: action.payload });
            })
            .addCase(postAiQuery.rejected, (state, action) => {
                state.status = 'failed';
                const errorMessage = action.payload?.detail || 'An unknown error occurred.';
                state.conversation.push({ sender: 'ai', text: `Error: ${errorMessage}` });
                state.error = action.payload;
            });
    },
});

export const { addUserMessage } = aiSlice.actions;
export default aiSlice.reducer;