import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getUserAction } from "./redux/actions/userActions";
import Account from "./pages/Account";
import Bookings from "./pages/Events";
import UpdateProfile from "./pages/UpdateProfile";

import AllUsers from "./pages/AllUsers";
import AllEvents from "./pages/AllEvents";
import UpdateEvent from "./pages/UpdateEvent";
import CreateEvent from "./pages/CreateEvent";
import DefaultDashboard from "./pages/DefaultDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import AdminRoute from "./components/AdminRoute";
// import Body from "./components/Body";
import Search from "./components/Search";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="bg-slate-50 min-h-screen">
        <Navbar />
        <hr className="border-t border-grey-400" />
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route
            path="/"
            element={
              <>
                <Home />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <DefaultDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AllUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/Events"
            element={
              <AdminRoute>
                <AllEvents />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/Event/:id/update"
            element={
              <AdminRoute>
                <UpdateEvent />
              </AdminRoute>
            }
          />
          <Route path="/user/Event/:id/update" element={<UpdateEvent />} />
          <Route
            path="/admin/Event/create"
            element={
              <AdminRoute>
                <CreateEvent />
              </AdminRoute>
            }
          />
          <Route path="/user/Event/create" element={<CreateEvent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
