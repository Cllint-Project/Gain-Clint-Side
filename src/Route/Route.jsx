import {createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Page/Home";
import Invesment from "../Page/Invesment";

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
          }
       ]
     },
   ]);
 export default router 