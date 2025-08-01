import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from '../features/events/eventsSlice';
import aiReducer from '../features/ai/aiSlice';

export const store = configureStore({
    reducer: {
        events: eventsReducer,
        ai: aiReducer,
    },
});