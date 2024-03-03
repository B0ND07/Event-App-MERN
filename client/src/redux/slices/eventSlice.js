import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Events: undefined,
  Event: undefined,
  searchEvent: undefined,
  hasSearched: false,
  allEvents: undefined,
  isEventUpdated: false,
  isLoading: true,
  Eventref: undefined,
};

const EventSlice = createSlice({
  name: "Event",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.Events = action.payload;
    },
    setEvent: (state, action) => {
      state.Event = action.payload;
    },
    SetSearch: (state, action) => {
      state.searchEvent = action.payload;
    },
    setHasSearched: (state, action) => {
      state.hasSearched = action.payload;
    },
    setAllEvents: (state, action) => {
      state.allEvents = action.payload;
    },
    setIsEventUpdated: (state, action) => {
      state.isEventUpdated = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setEventRef: (state, action) => {
      state.Eventref = action.payload;
    },
  },
});

export const {
  setEvents,
  setEvent,
  setEventRef,
  SetSearch,
  setHasSearched,
  setAllEvents,
  setIsEventUpdated,
  setLoading,
} = EventSlice.actions;

export default EventSlice.reducer;
