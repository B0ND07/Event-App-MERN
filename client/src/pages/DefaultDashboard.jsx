import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
} from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MapsHomeWorkSharpIcon from "@mui/icons-material/MapsHomeWorkSharp";
import AddHomeWorkSharpIcon from "@mui/icons-material/AddHomeWorkSharp";


import { useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";



const DefaultDashboard = () => {
  const [first, setfirst] = useState(true);
  const open = first;
  const dispatch = useDispatch();
  const isMobileDevice = useMediaQuery("(max-width:0px)");

  useEffect(() => {
    if (isMobileDevice) {
      setfirst(false);
    }
  }, [isMobileDevice, dispatch]);

  return (
    <div className="flex justify-center mt-[10%]">
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <Tooltip title={open ? "" : "All Users"} placement="right">
            <NavLink to="/admin/users">
              {({ isActive }) => (
                <ListItemButton
                  selected={isActive}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PeopleAltIcon className="text-violet-400" />
                  </ListItemIcon>
                  <ListItemText
                    className="text-violet-400 font-semibold"
                    primary="All Users"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </Tooltip>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }}>
          <Tooltip title={open ? "" : "All Events"} placement="right">
            <NavLink to="/admin/Events">
              {({ isActive }) => (
                <ListItemButton
                  selected={isActive}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <MapsHomeWorkSharpIcon className="text-violet-400" />
                  </ListItemIcon>
                  <ListItemText
                    className="text-violet-400 font-semibold"
                    primary="All Events"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </Tooltip>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }}>
          <Tooltip title={open ? "" : "Create Event"} placement="right">
            <NavLink to="/admin/Event/create">
              {({ isActive }) => (
                <ListItemButton
                  selected={isActive}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <AddHomeWorkSharpIcon className="text-violet-400" />
                  </ListItemIcon>
                  <ListItemText
                    className="text-violet-400 font-semibold"
                    primary="Create Event"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </Tooltip>
        </ListItem>
        {/* <ListItem disablePadding sx={{ display: "block" }}>
          <Tooltip title={open ? "" : "Bookings"} placement="right">
            <NavLink to="/admin/bookings">
              {({ isActive }) => (
                <ListItemButton
                  selected={isActive}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <BookmarkAddedSharpIcon className="text-violet-400" />
                  </ListItemIcon>
                  <ListItemText
                    className="text-violet-400 font-semibold"
                    primary="All Bookings"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </Tooltip>
        </ListItem> */}
      </List>
    </div>
  );
};

export default DefaultDashboard;
