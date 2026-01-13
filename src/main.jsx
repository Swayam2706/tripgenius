import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import CreateTrip from "./create-trip/index.jsx"
import ViewTrip from "./view-trip/[tripId]/index.jsx"
import Layout from "./components/custom/Layout"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { AuthProvider } from "./context/AuthContext"
import Profile from "./pages/Profile"
import TripHistory from "./pages/TripHistory"
import TravelStats from "./pages/TravelStats"
import SavedPlaces from "./pages/SavedPlaces"

const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children: [
      {
        path:"/",
        element:<App/>
      },
      {
        path:"/create-trip",
        element:<CreateTrip/>
      },
      {
        path:"/view-trip/:tripId",
        element:<ViewTrip/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/trip-history",
        element:<TripHistory/>
      },
      {
        path:"/travel-stats",
        element:<TravelStats/>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
