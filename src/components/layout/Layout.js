import Navbar from "../pages/navbar/Navbar"
import Listing from "../pages/listing/Listing"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddListing from "../pages/addListing/AddListing";
import { Fragment } from "react";

const Layout = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Listing />,
    },
    {
      path: "/add",
      element: <AddListing />,
    },

  ]);
  return (
    <Fragment>
      <Navbar/>
      <RouterProvider router={router} />
    </Fragment>
  )
}

export default Layout
