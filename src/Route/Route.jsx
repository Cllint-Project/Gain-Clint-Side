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
import ReachargeDetail from "../DashBord/DashBoardComponent/ReachargeDetail";
import UserManagement from "../DashBord/DashBoardComponent/UserManagement";
import WithDrawDetails from "../DashBord/DashBoardComponent/WithDrawDetails";
import Cuppon from "../DashBord/DashBoardComponent/Cuppon";
import InvesmentData from "../Component/InvesmentData";
import ReachargeRecord from "../Component/ReachargeRecord";
import Profile from "../Component/Profile";
import Details4 from "../Component/Details4";
import EntryProject from "../Component/EntryProject";
import Faq1 from "../Component/Faq1";
import Faq2 from "../Component/Faq2";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import MachineDetails from "../DashBord/DashBoardComponent/MachineDetails";
import WithdrawRecord from "../Component/WithdrawRecord";
import ShowBalanceDetails from "../Page/Balance/ShowBalanceDetails";
import UserLottery from "../Component/UserLottary";
import AdminLottery from "../DashBord/DashBoardComponent/Lottery/AdminLottery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <PrivateRoute><Home></Home></PrivateRoute>,
      },
      {
        path: "/invesment",
        element: (
          <PrivateRoute>
            <Invesment></Invesment>
          </PrivateRoute>
        ),
      },
      {
        path: "/ourteam",
        element: (
          <PrivateRoute>
            <OurTeam></OurTeam>
          </PrivateRoute>
          // done
        ),
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
        path: "/data",
        element: <Details4></Details4>,
      },
      {
        path: "/entry",
        element: <EntryProject></EntryProject>,
      },
      {
        path: "/faq",
        element: <Faq1></Faq1>,
      },
      {
        path: "/faq",
        element: <Faq1></Faq1>,
      },
      {
        path: "/faqs",
        element: <Faq2></Faq2>,
      },
      {
        path: "/recharge",
        element: (
          <PrivateRoute>
            <Reacharge></Reacharge>
          </PrivateRoute>
        ),
      },
      {
        path: "/personal",
        element: (
          <PrivateRoute>
            <Personal></Personal>
          </PrivateRoute>
          // done
        ),
      },
      {
        path: "/cardDetails/:id",
        element: (
          <PrivateRoute>
            <CardDetails></CardDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/transaction",
        element: (
          <PrivateRoute>
            <Transaction></Transaction>
          </PrivateRoute>
        ),
      },
      {
        path: "/withdraw",
        element: (
          <PrivateRoute>
            <WithDraw></WithDraw>
          </PrivateRoute>
        ),
      },
      {
        path: "/userlottary",
        element: (
          <PrivateRoute>
            <UserLottery />
          </PrivateRoute>
        ),
      },

      {
        path: "/investmentrecord",
        element: (
          <PrivateRoute>
            <InvesmentData></InvesmentData>
          </PrivateRoute>
        ),
      },
      {
        path: "/reachargerecord",
        element: (
          <PrivateRoute>
            <ReachargeRecord></ReachargeRecord>
          </PrivateRoute>
        ),
      },
      {
        path: "/withdrawrecord",
        element: (
          <PrivateRoute>
            <WithdrawRecord></WithdrawRecord>
          </PrivateRoute>
        ),
      },
      {
        path: "/ShowBalanceDetails",
        element: (
          <PrivateRoute>
            <ShowBalanceDetails></ShowBalanceDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  //  DashBoard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <DashBordLayout></DashBordLayout>
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "recharge",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ReachargeDetail></ReachargeDetail>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "user",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UserManagement></UserManagement>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "withdraw",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <WithDrawDetails></WithDrawDetails>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "coupon",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Cuppon></Cuppon>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "lottary",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminLottery />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "machinedetail",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <MachineDetails></MachineDetails>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Profile></Profile>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
