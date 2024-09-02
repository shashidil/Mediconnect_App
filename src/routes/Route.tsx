
import {BaseLayout} from "../layout/BaseLayout/BaseLayout";
import {Error403} from "../pages/commonError/Error403";
import {Error401} from "../pages/commonError/Error401";
import {createBrowserRouter} from "react-router-dom";
import {Dashboard} from "../pages/dashboard/Dashboard";
import {UserRegistration} from "../pages/Users/UserRegistration";
import { PateintDashboard } from "../components/Dashboards/PateintDashboard";
import { PhamacistDashboard } from "../components/Dashboards/PhamacistDashboard";
import { UploadPrescription } from "../pages/UploadPriscription/UploadPrescription";
import { Responses } from "../pages/Responses/Responses";
import { UserLogin } from "../pages/Users/UserLogin";
import Overview from './../pages/Overview/Overview';
import Orders from "../pages/Orders/Orders";
import Requests from "../pages/Requests/Requests";
import ChatPage from "../pages/ChatApp/ChatPage";
import OrderHistory from "../pages/Orders/OrderHistory";
import PharmacistOrderPage from "../pages/Orders/PharmacistOrder/OrderHistoryPharmacist";
import {Settings} from "../pages/Settings/Settings";
import React from "react";
import {Reports} from "../pages/Reports/Reports";
import {Analytics} from "../pages/Analytics/Analytics";
import {AdminDashboard} from "../components/Dashboards/AdminDashboard";
import {AdminInquiries} from "../pages/AdminInquiries/AdminInquiries";
import {Inquiries} from "../pages/Inquiries/Inquiries";

export const ROUTES = createBrowserRouter([
    {
        path: "/error-403",
        element: <Error403 />,
    },
    {
        path: "/error-401",
        element: <Error401 />,
    },
    {
        path: "/signup",
        element:<UserRegistration/>
    },
    {
        path: "",
        element:<UserLogin/>
    },
    {
        path: "/signin",
        element:<UserLogin/>
    },
    {
        path: "/pharmacist",
        element: <PhamacistDashboard />,
        children: [

            {
                path: "requests",
                index: true,
                element:<Requests />

            },
            {
                path: "chat",
                index: true,
                element:<ChatPage />

            },
            {
                path: "Payment",
                index: true,
                element:<PharmacistOrderPage />

            },
            {
                path: "settings",
                index: true,
                element:<Settings/>

            },
            {
                path: "reports",
                index: true,
                element:<Reports/>

            },
            {
                path: "overview",
                index: true,
                element:<Analytics/>

            },
            {
                path: "inquires",
                index: true,
                element:<Inquiries/>

            },
           

        ]
    }
,

    {
        path: "/patient",
        element:<PateintDashboard/>,
        children:[
            {
                path: "upload",
                index: true,
                element:<UploadPrescription/>
            },

            {
                path: "response",
                index: true,
                element:<Responses/>

            },

            {
                path: "overview",
                index: true,
                element:<Overview />

            },

            {
                path: "orders",
                index: true,
                element:<Orders />

            },
            {
                path: "chat",
                index: true,
                element:<ChatPage />

            },
            {
                path: "ordersHistory",
                index: true,
                element:<OrderHistory />

            },
            {
                path: "settings",
                index: true,
                element:<Settings/>

            },
            {
                path: "inquires",
                index: true,
                element:<Inquiries/>

            },
        ]
    },

    {
        path: "/admin",
        element:<AdminDashboard/>,
        children:[
            {
                path: "",
                index: true,
                element:<AdminInquiries/>
            },
            {
                path: "dashboard",
                index: true,
                element:<AdminInquiries/>
            },
            {
                path: "chat",
                index: true,
                element:<ChatPage />
            },

        ]
    },
]);