import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import ShowListing from "./Pages/ShowListing";
import ShowDetails, { showloader } from "./Pages/ShowDetails";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ErrorPage from "./Pages/Error";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  const routes = createBrowserRouter([
    {
      id: "base",
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          id: "home",
          path: "/",
          element: <ShowListing />,
        },
        {
          id: "details",
          path: "/shows/:showId",
          loader: showloader,
          element: <ShowDetails />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
