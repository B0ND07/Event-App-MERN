import axios from "axios";
import { setError } from "../slices/userSlice";
import {
  SetSearch,
  setAllEvents,
  setHasSearched,
  setEvent,
  setEventRef,
  setEvents,
  setIsEventUpdated,
  setLoading,
} from "../slices/eventSlice";
axios.defaults.withCredentials = true;

export const getFeaturedEvents = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get("http://localhost:5006/api/events/");
    if (data) {
      // const popular = data.slice(0, 4);
      dispatch(setEvents(data));
    }
    dispatch(setLoading(false));
  } catch (err) {
    // dispatch(setError(err.response.data.message));
    // console.log(err)
  }
};

export const getEventAction = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(`http://localhost:5006/api/events/${id}`);
    console.log("iddata",data);

    dispatch(setEvent(data[0]));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setError(err.response.data.message));
  }
};

export const getSearchAction = (query) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(
      `http://localhost:5006/api/events/search/${query}`
    );

    dispatch(SetSearch(data));
    dispatch(setLoading(false));
    dispatch(setHasSearched(true));
  } catch (err) {
    // dispatch(setError(err.response.data.message));
  }
};

export const getAllEventsAction = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get("http://localhost:5006/api/events/");
    dispatch(setAllEvents(data));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setError(err.response.data.message));
  }
};

export const updateEventAction = (id, url) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:5006/api/events/${id}`, url, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(setIsEventUpdated(true));
  } catch (err) {
    dispatch(setError(err.response.data.message));
  }
};

export const deleteEventAction = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5006/api/events/${id}`);
  } catch (err) {
    dispatch(setError(err.response.data.message));
  }
};

export const createEventAction = (url) => async (dispatch) => {
  try {
    const event = await axios.post(`http://localhost:5006/api/events/`, url, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(setEventRef(event.data._id));
    dispatch(setIsEventUpdated(true));
    console.log("check", event);
  } catch (err) {
    dispatch(setError(err.response.data.message));
  }
};
