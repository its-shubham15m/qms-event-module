import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/events';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const createEvent = createAsyncThunk('events/createEvent', async (eventData, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, eventData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = { events: [], status: 'idle', error: null };

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createEvent.pending, (state) => { state.status = 'loading'; })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.events.unshift(action.payload);
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default eventsSlice.reducer;