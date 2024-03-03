import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Button,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setIsEventUpdated } from "../redux/slices/eventSlice";
import {

  getEventAction,
  updateEventAction,
} from "../redux/actions/eventActions";
import axios from "axios";


const UpdateEvent = () => {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [city, setcity] = useState("");
  const [description, setDescription] = useState("");
  const { isEventUpdated, Event } = useSelector((state) => state.EventState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getEventAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (Event) {
      setName(Event.name);
      setcity(Event.city);
      setDescription(Event.description);
    }
  }, [Event]);

  useEffect(() => {
    if (isEventUpdated) {
      // navigate("/");
      dispatch(setIsEventUpdated(false));
    }
  }, [isEventUpdated, dispatch, navigate]);

  const handleSubmit = async(event) => {
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

    const formData = {
      name,
      city,
      description,
      photos:secure_url,
    };

    dispatch(updateEventAction(id, formData));
    navigate("/");
  };

  return (
    <Fragment>
      <div title="Update Event" />
      <div className="flex">
        {/* <AdminDashboard /> */}

        <div className="px-4 md:px-10 lg:px-20 xl:px-48 mx-auto">
          <h2 className="text-2xl font-medium text-center my-8">
            Update Event
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
              type="submit"
              className="!bg-red-400 !py-4"
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default UpdateEvent;
