import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useNavigate } from "react-router-dom";
import { setIsEventUpdated } from "../redux/slices/eventSlice";
import {
  createEventAction,
  updateEventAction,
} from "../redux/actions/eventActions";

import AdminDashboard from "./AdminDashboard";
import axios from "axios";

const CreateEvent = () => {
  const user = useSelector((state) => state.userState.user);
  console.log(user);
  const [username, setUserName] = useState("");
  // setUserName(user?.username)
  // console.log(username);
  const [file, setFile] = useState("");

  const [name, setName] = useState("");
  const [photourl, setPhotourl] = useState("");
  const [city, setcity] = useState("");
  // const [EventRef, setEventRef] = useState(undefined);

  const [description, setDescription] = useState("");
  const { isEventUpdated, Eventref } = useSelector((state) => state.EventState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserName(user?.username);
    if (isEventUpdated) {
      navigate("/");
      dispatch(setIsEventUpdated(false));
      setUserName(user?.username);
    }
  }, [isEventUpdated, dispatch, navigate, user]);

  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "upload");

  //   const uploadRes = await axios.post(
  //     "https://api.cloudinary.com/v1_1/db6qtb2bu/image/upload",
  //     formData,
  //     { withCredentials: false }
  //   );

  //   const { secure_url } = uploadRes.data;
  //   setPhotourl(secure_url)
  // dispatch(updateEventAction(Eventref._id, { photos: secure_url }));
  // console.log(secure_url);
  // console.log(uploadRes.data);

  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData1 = new FormData();
    formData1.append("file", file);
    formData1.append("upload_preset", "upload");

    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/db6qtb2bu/image/upload",
      formData1,
      { withCredentials: false }
    );

    const { secure_url } = uploadRes.data;
    setUserName(user?.username);
    // console.log("username", username);
    const formData = {
      name,
      city,
      description,
      username: username,
      photos: secure_url,
    };
    dispatch(createEventAction(formData));

    navigate("/");
  };

  return (
    <Fragment>
      <div title="Update Event" />
      <div className="flex">
        {/* <AdminDashboard /> */}

        <div className="px-4 md:px-10 lg:px-20 xl:px-48 mx-auto">
          <h2 className="text-2xl font-medium text-center my-8">
            Create Event
          </h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="border border-solid border-gray-400 py-3 px-5 rounded">
              <FormatColorTextIcon className="text-gray-600" />
              <input
                type="text"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Event Name"
                className="w-40 sm:w-60 md:w-80 ml-3 outline-none bg-transparent"
              />
            </div>
            <div className="border border-solid border-gray-400 py-3 px-5 rounded">
              <LocationOnIcon className="text-gray-600" />
              <input
                type="text"
                required={true}
                value={city}
                onChange={(e) => setcity(e.target.value)}
                placeholder="city"
                className="w-40 sm:w-60 md:w-80 ml-3 outline-none bg-transparent"
              />
            </div>

            <textarea
              required={true}
              placeholder="Event Description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-solid border-gray-400 py-3 px-5 rounded resize-none focus:outline-none bg-transparent"
            />

            <Button component="label">
              <FileUploadIcon color="action" fontSize="large" />
              <input
                multiple
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              className="!bg-red-400 !py-4"
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default CreateEvent;
