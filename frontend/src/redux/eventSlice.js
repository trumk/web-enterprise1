import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
    name: "event",
    initialState: {
        events: {
            allEvents: null,
            isFetching: false,
            error: false,
        },
        event: {
            currentEvent: null,
            isFetching: false,
            error: false,
        },
        addEvent: {
            isFetching: false,
            error: false,
        }
    },
    reducers: {
        getEventsStart: (state) => {
            state.events.isFetching = true;
        },
        getEventsFailed: (state) => {
            state.events.isFetching = false;
            state.events.error = true;
        },
        getEventsSuccess: (state, action) => {
            state.events.isFetching = false;
            state.events.allEvents = action.payload;
            state.events.error = false;
        },
        getEventStart: (state) => {
            state.event.isFetching = true;
        },
        getEventFailed: (state) => {
            state.event.isFetching = false;
            state.event.error = true;
        },
        getEventSuccess: (state, action) => {
            state.event.isFetching = false;
            state.event.currentEvent = action.payload;
            state.event.error = false;
        },
        addEventStart: (state) => {
            state.addEvent.isFetching = true;
        },
        addEventSuccess: (state) => {
            state.addEvent.isFetching = false;
            state.addEvent.error = false;
        },
        addEventFailed: (state) => {
            state.addEvent.isFetching = false;
            state.addEvent.error = true;
        },
    }
})
export const {
    getEventsStart,
    getEventsSuccess,
    getEventsFailed,
    getEventStart,
    getEventSuccess,
    getEventFailed,
    addEventStart,
    addEventSuccess,
    addEventFailed
  } = eventSlice.actions;
  export default eventSlice.reducer;