import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Page/Home";
import Invesment from "../Page/Invesment";
import OurTeam from "../Page/OurTeam";
import Login from "../Page/Login";
import Registation from "../Page/Registation";
import Details1 from "../Component/Details1";
import Details2 from "../Component/Details2";
import Details3 from "../Component/Details3";
import Reacharge from "../Component/Reacharge";
import Personal from "../Page/Personal";
import CardDetails from "../Component/CardDetails";
import Transaction from "../Component/Transaction";
import WithDraw from "../Component/WithDraw";
import DashBordLayout from "../DashBord/DashBordLayout/DashBordLayout";
import DonetPage from "../Component/DonetPage";
import ReachargeDetail from "../DashBord/DashBoardComponent/ReachargeDetail";
import UserManagement from "../DashBord/DashBoardComponent/UserManagement";
import WithDrawDetails from "../DashBord/DashBoardComponent/WithDrawDetails";
import Cuppon from "../DashBord/DashBoardComponent/Cuppon";
import InvesmentData from "../Component/InvesmentData";
import ReachargeRecord from "../Component/ReachargeRecord";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/invesment",
        element: <Invesment></Invesment>,
      },
      {
        path: "/ourteam",
        element: <OurTeam></OurTeam>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registation",
        element: <Registation></Registation>,
      },
      {
        path: "/details",
        element: <Details1></Details1>,
      },
      {
        path: "/detail",
        element: <Details2></Details2>,
      },
      {
        path: "/detailed",
        element: <Details3></Details3>,
      },
      {
        path: "/recharge",
        element: <Reacharge></Reacharge>,
      },
      {
        path: "/personal",
        element: <Personal></Personal>,
      },
      {
        path: "/cardDetails/:id",
        element: <CardDetails></CardDetails>,
      },
      {
        path: "/transaction",
        element: <Transaction></Transaction>,
      },
      {
        path: "/withdraw",
        element: <WithDraw></WithDraw>,
      },
      {
        path: "/donate",
        element: <DonetPage></DonetPage>,
      },
      {
        path: "/investmentrecord",
        element: <InvesmentData></InvesmentData>,
      },
      {
        path: "/reachargerecord",
        element: <ReachargeRecord></ReachargeRecord>,
      }
    ],
  },
  //  DashBord
  {
    path: "/dashboard",
    element: <DashBordLayout></DashBordLayout>,
    children: [
      {
        path: "reacharge",
        element: <ReachargeDetail></ReachargeDetail>,
      },
      {
        path: "user",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "withdraw",
        element: <WithDrawDetails></WithDrawDetails>,
      },
      {
        path: "cupon",
        element: <Cuppon></Cuppon>,
      },
    ],
  },
]);
export default router;
