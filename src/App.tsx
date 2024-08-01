import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ShowListing, { showListLoader } from "./Pages/ShowListing";
import ShowDetails, { showloader } from "./Pages/ShowDetails";
import Footer from "./components/Footer";

function App() {
  const routes = createBrowserRouter([
    {
      id: "home",
      path: "/",
      loader: showListLoader,
      element: <ShowListing />,
    },
    {
      id: "details",
      path: "/shows/:showId",
      loader: showloader,
      element: <ShowDetails />,
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
      <Footer />
    </>
  );
}

export default App;
