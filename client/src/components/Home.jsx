import React, { useEffect, useState } from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DisplayEvents from "./DisplayEvents";
import { useDispatch, useSelector } from "react-redux";
import {
  getFeaturedEvents,
  getSearchAction,
} from "../redux/actions/eventActions";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Events, isLoading } = useSelector((state) => state.EventState);
  const [query, setQuery] = useState("");
  useEffect(() => {
    try {
      dispatch(getFeaturedEvents());
    } catch (err) {
      console.error("Error fetching featured Events:", err.message);
    }
  }, [dispatch, query]);

  const handleSearch = () => {
    if (query) {
      dispatch(getSearchAction(query));
    }
    navigate("/search");
  };

  return (
    <div>
      <div className="mx-auto px-4 md:px-10 lg:px-20 xl:px-48 mt-4">
        <h1 className="text-4xl font-[500] text-violet-600">
          Where are you Going?
        </h1>
        <div className="flex flex-col md:flex-row gap-4 mt-4 mb-6">
          <div className="md:w-full h-16 rounded border transition duration-200 cursor-pointer border-gray-400 flex items-center px-6 gap-4 hover:border-red-400 bg-white">
            <FmdGoodIcon
              fontSize="large"
              className="rounded-full text-violet-600 cursor-pointer hover:bg-neutral-200 transition duration-200 p-1 "
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className=" bg-white outline-none w-full h-full"
              type="text"
              placeholder="Search Location"
            />
          </div>
          <div className="flex justify-center mt-3 md:mt-0 items-center">
            <button
              onClick={handleSearch}
              className=" bg-red-500 rounded font-medium hover:bg-red-600 w-72 !text-orange-50 md:w-24 lg:w-32 md:h-full h-12 "
            >
              search
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-[500] text-violet-600 mt-4">
          Popular Events
        </h1>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {Events && (
              <div className="flex flex-wrap">
                {Events.map((Event) => (
                  <div key={Event._id} className="w-full md:w-1/2 p-2">
                    <DisplayEvents Event={Event} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
