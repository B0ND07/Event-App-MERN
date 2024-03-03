import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { getEventsAction } from "../redux/actions/userActions";

import {
  deleteEventAction,
  getAllEventsAction,
} from "../redux/actions/eventActions";

const Bookings = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.EventState);
  const [open] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [EventRef, setEventRef] = useState(undefined);

  const user = useSelector((state) => state.userState.user);
  const bookings = useSelector((state) => state.userState.bookings);

  useEffect(() => {
    dispatch(getEventsAction());
  }, [dispatch]);

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteEventAction(EventRef._id));
    setIsDeleteOpen(!isDeleteOpen);
    dispatch(getAllEventsAction());
  };

  useEffect(() => {
    if (user?.username) {
      dispatch(getEventsAction(user.username));
    }
  }, [user, dispatch]);
  console.log("bookings", bookings);

  return (
    <Fragment>
      <div title="All Events" />
      <div className="flex">
        {/* <AdminDashboard /> */}
        <Fragment>
          <div className="w-[80%] sm:w-[60%] md:w-[70%] mx-auto mt-3">
            <h2 className="text-2xl font-medium text-center my-8">My Events</h2>
            <Link to="/user/Event/create">
              <button className=" text-gray-50 bg-blue-500 hover:text-white-50 hover:bg-blue-600 border-solid border py-2 px-2 rounded-lg w-18 text-center transition duration-200 box-border font-medium">
                Create Event
              </button>
            </Link>

            <TableContainer component={Paper}>
              <Table className="min-w-[700px]">
                <TableHead>
                  <TableRow className="bg-red-300">
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="center">Name</TableCell>

                    <TableCell align="center">Update</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                {isLoading ? (
                  <Loader />
                ) : (
                  <TableBody>
                    {bookings?.map((Event) => (
                      <TableRow key={Event._id} style={{ height: 72.8 }}>
                        <TableCell align="center">{Event._id}</TableCell>
                        <TableCell align="center">{Event.name}</TableCell>

                        <TableCell align="center">
                          <IconButton>
                            <Link to={`/user/Event/${Event._id}/update`}>
                              <EditIcon />
                            </Link>
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => {
                              setIsDeleteOpen(!isDeleteOpen);
                              setEventRef(Event);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <Dialog
              open={open}
              scroll="body"
              className="!w-screen"
              fullWidth={true}
            ></Dialog>
            <Dialog open={isDeleteOpen}>
              <DialogTitle className="text-center">Delete Event?</DialogTitle>
              <DialogContent className="m-8">
                <DialogContentText className="text-gray-900">
                  This will delete Event's room and room's booking details also.
                </DialogContentText>
              </DialogContent>
              <DialogActions className="m-4">
                <button
                  onClick={() => {
                    setIsDeleteOpen(!isDeleteOpen);
                    setEventRef(undefined);
                  }}
                  className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  className=" border-red-400 text-violet-400 hover:text-violet-600 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </DialogActions>
            </Dialog>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
};

export default Bookings;
