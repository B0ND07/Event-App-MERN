import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MapsHomeWorkSharpIcon from "@mui/icons-material/MapsHomeWorkSharp";
import AddHomeWorkSharpIcon from "@mui/icons-material/AddHomeWorkSharp";
import { useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";

const openedMixin = (theme) => ({
  width: 240,
  height: "89vh",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "0 .5rem",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  position: "relative",
  width: 240,
  ".MuiDrawer-paper": {
    zIndex: 1,
    top: "auto",
    position: "relative",
  },
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AdminDashboard = () => {
  const [first, setfirst] = useState(true);
  const open = first;
  const dispatch = useDispatch();
  const isMobileDevice = useMediaQuery("(max-width:640px)");

  const handleDrawerOpen = () => {
    setfirst(!first);
  };

  useEffect(() => {
    if (isMobileDevice) {
      setfirst(false);
    }
  }, [isMobileDevice, dispatch]);

  return (
    <>
      <Drawer variant="permanent" open={first}>
        {!isMobileDevice && (
          <DrawerHeader>
            <IconButton onClick={handleDrawerOpen} className="!text-violet-600">
              {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
        )}
        <List className="!-mt-2">
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
        
        </List>
      </Drawer>
    </>
  );
};

export default AdminDashboard;
