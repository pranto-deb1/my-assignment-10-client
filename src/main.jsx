import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import AllReviews from "./Pages/AllReviews.jsx";
import PrivateRoute from "./Components/PrivetRout.jsx";
import AddReview from "./Pages/AddReview.jsx";
import ReviewDetail from "./Pages/ReviewDetail.jsx";
import MyReviews from "./Pages/MyReviews.jsx";
import EditReview from "./Pages/EditReview.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
      { path: "all-reviews", Component: AllReviews },
      {
        path: "/add-review",
        element: (
          <PrivateRoute>
            <AddReview></AddReview>
          </PrivateRoute>
        ),
      },
      {
        path: "/Review-Detail/:id",
        element: (
          <PrivateRoute>
            <ReviewDetail></ReviewDetail>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-review/:id",
        element: (
          <PrivateRoute>
            <EditReview></EditReview>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
