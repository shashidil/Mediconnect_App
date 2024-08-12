
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
import Analytics from "../pages/Analytics/Analytics";


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

           
        ]
    },

    // {
    //     path: "/pharmacist",
    //     element:<PhamacistDashboard/>,
    //     children:[
    //         // {
    //         //     path: "/overveiw",
    //         //     index: true,
    //         //     element:<Requests/>
    //         // },
    //         {
    //             path: "/request",
    //             index: true,
    //             element:<Requests/>
    //         },

    //         // {
    //         //     path: "report",
    //         //     index: true,
    //         //     element:<Analytics/>

    //         // },

    //         // {
    //         //     path: "overview",
    //         //     index: true,
    //         //     element:<Overview />

    //         // },

    //         // {
    //         //     path: "orders",
    //         //     index: true,
    //         //     element:<Orders />

    //         // },

    //         // {
    //         //     path: "requests",
    //         //     index: true,
    //         //     element:<Requests />

    //         // },
    //     ]
    // },
]);