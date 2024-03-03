import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import EventSlice from "./slices/eventSlice";

const reducer = {
  userState: userSlice,
  EventState: EventSlice,
};

export const store = configureStore({
  reducer,
});
