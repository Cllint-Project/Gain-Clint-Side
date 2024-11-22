import {createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Page/Home";
import Invesment from "../Page/Invesment";
import OurTeam from "../Page/OurTeam";
import Login from "../Page/Login";
import Registation from "../Page/Registation";
import Details1 from "../Component/Details1";
import Details2 from "../Component/Details2";
import Details3 from "../Component/Details3";

const router = createBrowserRouter([
     {
       path: "/",
       element: <App></App>,
       children:[
          {
               path:"/",
               element:<Home></Home>
          },
          {
            path:"/invesment",
            element:<Invesment></Invesment>
          },
          {
            path:"/ourteam",
            element:<OurTeam></OurTeam>
          },
          {
            path:"/login",
            element:<Login></Login>
          },
          {
            path:"/registation",
            element:<Registation></Registation>
          },
          {
            path:"/details",
            element:<Details1></Details1>
          },
          {
            path:"/detail",
            element:<Details2></Details2>
          },
          {
            path:"/detailed",
            element:<Details3></Details3>
          },
       ]
     },
   ]);
 export default router 