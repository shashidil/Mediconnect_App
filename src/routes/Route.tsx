import {InvalidURL} from "../pages/commonError/InvalidURL";
import {Unauthorized} from "../pages/commonError/Unauthorized";
import {createBrowserRouter} from "react-router-dom";
import {UserRegistration} from "../pages/Users/UserRegistration";
import {PateintDashboard} from "../components/Dashboards/PateintDashboard";
import {PhamacistDashboard} from "../components/Dashboards/PhamacistDashboard";
import {UploadPrescription} from "../pages/UploadPriscription/UploadPrescription";
import {Responses} from "../pages/Responses/Responses";
import {UserLogin} from "../pages/Users/UserLogin";
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
import SessionCheck from "../services/SessionCheck";
import RoleBasedRoute from "../services/RoleBasedRoute";



export const ROUTES = createBrowserRouter([
    {
        path: "*",
        element: <InvalidURL/>,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized/>,
    },
    {
        path: "/signup",
        element: <UserRegistration/>
    },
    {
        path: "",
        element: <UserLogin/>
    },
    {
        path: "/signin",
        element: <UserLogin/>
    },
    {
        path: "/pharmacist",
        element: (
            <RoleBasedRoute requiredRole="ROLE_PHARMACIST">
                <PhamacistDashboard/>
            </RoleBasedRoute>
        ),
        children: [

            {
                path: "requests",
                index: true,
                element: <>
                    <SessionCheck/>
                    <Requests/>
                </>

            },
            {
                path: "chat",
                index: true,
                element: <>
                    <SessionCheck/>
                    <ChatPage/>
                </>

            },
            {
                path: "Payment",
                index: true,
                element: <>
                    <SessionCheck/>
                    <PharmacistOrderPage/>
                </>

            },
            {
                path: "settings",
                index: true,
                element: <>
                    <SessionCheck/>
                    <Settings/>
                </>

            },
            {
                path: "reports",
                index: true,
                element: <>
                    <SessionCheck/>
                    <Reports/>
                </>

            },
            {
                path: "overview",
                index: true,
                element: <>
                    <SessionCheck/>
                    <Analytics/>
                </>

            },
            {
                path: "",
                index: true,
                element: <>
                    <SessionCheck/>
                    <Analytics/>
                </>

            },
            {
                path: "inquires",
                index: true,
                element: <>
                    <SessionCheck/>
                    <Inquiries/>
                </>

            },


        ]
    }
    ,

    {
        path: "/patient",
        element: (
            <RoleBasedRoute requiredRole="ROLE_CUSTOMER">
                <PateintDashboard/>
            </RoleBasedRoute>
        ),
        children: [
            {
                path: "upload",
                index: true,
                element: <>
                    <SessionCheck/>
                    <UploadPrescription/>
                </>
            },
            {
                path: "",
                index: true,
                element: <>
                    <SessionCheck/>
                    <UploadPrescription/>
                </>
            },

            {
                path: "response",
                index: true,
                element: <>
                    <SessionCheck/>
                    <Responses/>
                </>

            },

            {
                path: "overview",
                index: true,
                element: <>
                    <SessionCheck/>
                    <Overview/>
                </>

            },

            {
                path: "orders",
                index: true,
                element: <>
                    <SessionCheck/>
                    {/* <Orders onOrderSuccess={} /> */}
                </>

            },
            {
                path: "chat",
                index: true,
                element: <>
                    <SessionCheck/>
                    <ChatPage/>
                </>

            },
            {
                path: "ordersHistory",
                index: true,
                element: <>
                    <SessionCheck/>
                    <OrderHistory/>

                </>
            },
            {
                path: "settings",
                index: true,
                element: <>
                    <SessionCheck/>
                    <Settings/>
                </>

            },
            {
                path: "inquires",
                index: true,
                element: <>
                    <SessionCheck/>
                    <Inquiries/>
                </>

            },
        ]
    },

    {
        path: '/admin',
        element: (
            <RoleBasedRoute requiredRole="ROLE_ADMIN">
                <AdminDashboard/>
            </RoleBasedRoute>
        ),
        children: [
            {
                path: '',
                index: true,
                element: (
                    <>
                        <SessionCheck/>
                        <AdminInquiries/>
                    </>
                ),
            },
            {
                path: 'dashboard',
                index: true,
                element: (
                    <>
                        <SessionCheck/>
                        <AdminInquiries/>
                    </>
                ),
            },
            {
                path: 'chat',
                index: true,
                element: (
                    <>
                        <SessionCheck/>
                        <ChatPage/>
                    </>
                ),
            },
        ],
    },
]);