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
    },
    editEvent: {
      currentEvent: null,
      isFetching: false,
      error: false,
    },
    deleteEvent: {
      isFetching: false,
      error: false,
    },
    searchEvent: {
      filterEvent: null,
      isFetching: false,
      error: false,
    },
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
    editEventStart: (state) => {
      state.editEvent.isFetching = true;
      state.editEvent.error = false;
    },
    editEventSuccess: (state, action) => {
      state.editEvent.currentEvent = action.payload;
      state.editEvent.isFetching = false;
      state.editEvent.error = false;
    },
    editEventFailed: (state) => {
      state.editEvent.isFetching = false;
      state.editEvent.error = true;
    },
    deleteEventStart: (state) => {
      state.deleteEvent.isFetching = true;
      state.deleteEvent.error = false;
    },
    deleteEventSuccess: (state) => {
      state.deleteEvent.isFetching = false;
      state.deleteEvent.error = false;
    },
    deleteEventFailed: (state) => {
      state.deleteEvent.isFetching = false;
      state.deleteEvent.error = true;
    },
    searchEventStart: (state) => {
      state.searchEvent.isFetching = true;
      state.searchEvent.error = false;
    },
    searchEventSuccess: (state, action) => {
      state.searchEvent.isFetching = false;
      state.searchEvent.filterEvent = action.payload;
      state.searchEvent.error = false;
    },
    searchEventFailed: (state) => {
      state.searchEvent.isFetching = false;
      state.searchEvent.error = true;
    },
  },
});
export const {
  getEventsStart,
  getEventsSuccess,
  getEventsFailed,
  getEventStart,
  getEventSuccess,
  getEventFailed,
  addEventStart,
  addEventSuccess,
  addEventFailed,
  editEventStart,
  editEventSuccess,
  editEventFailed,
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFailed,
} = eventSlice.actions;
export default eventSlice.reducer;
