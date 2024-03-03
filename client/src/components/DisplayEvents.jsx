import React from "react";
import {  useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";

const DisplayEvents = ({ Event }) => {
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate();
  const handleBook = () => {
    if (user?.username) {
      alert("booked successfully");
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <div className="md:min-h-60 gap-8 bg-white border rounded-2xl my-4 md:items-center">
        <div className="md:w-2/6 h-full">
          <div className="h-60 w-[100%] md:w-[300%] md:-mr-[21.33px] ">
           
              <img
                src={Event.photos}
                alt="Not available"
                className="w-[108vw] h-full rounded-t-2xl"
              />
          </div>
        </div>
        <div className="md:w-4/6 mx-4 md:my-6 mb-6">
          <span
            className="text-xl capitalize font-semibold"
          >
            {Event.name}
          </span>
          <br />
          <p>{Event.description}</p>

          <Rating name="read-only" value={5} readOnly />
          <br />

          {/* <p className="my-3">{Event.description}</p> */}
          <span className="font-medium text-gray-700">
            <LocationOnIcon className="mb-1" />
            {Event.city}
          </span>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={handleBook}
            className="mx-auto text-gray-50 bg-red-500 hover:text-white-50 hover:bg-red-600 border-solid border py-2 mb-3 px-2 rounded-lg w-18 text-center transition duration-200 box-border font-medium"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayEvents;
