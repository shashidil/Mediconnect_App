
import {BaseLayout} from "../layout/BaseLayout/BaseLayout";
import {Error403} from "../pages/commonError/Error403";
import {Error401} from "../pages/commonError/Error401";
import {createBrowserRouter} from "react-router-dom";
import {Dashboard} from "../pages/dashboard/Dashboard";
import {UserRegistration} from "../pages/Users/UserRegistration";
import { PateintDashboard } from "../components/Dashboards/PateintDashboard";
import { PhamacistDashboard } from "../components/Dashboards/PhamacistDashboard";
import { UploadPriscription } from "../pages/UploadPriscription/UploadPriscriptiion";


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
        path: "/",
        element: <BaseLayout />,
        children: [
            {
                path: "/",
                index: true,
                element:<Dashboard/>
            },
    
            {
                path: "/pharmacist",
                index: true,
                element:<PhamacistDashboard/>
            },
           

        ]
    }
,
    {
        path: "/patient",
        element:<PateintDashboard/>,
        children:[
            {
                path: "",
                index: true,
                element:<UploadPriscription/>
            },
        ]
    },
]);