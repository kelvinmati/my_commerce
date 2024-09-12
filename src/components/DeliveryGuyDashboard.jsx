import React from "react";
import profile from "../../images/profile.png";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./delivery_dashboard_routes/Home";
import AssignedDelivery from "./delivery_dashboard_routes/AssignedDelivery";
import PickUp from "./delivery_dashboard_routes/PickUp";
import CompletedDelivery from "./delivery_dashboard_routes/CompletedDelivery";
import PendingDelivery from "./delivery_dashboard_routes/PendingDelivery";
import CancelledDelivery from "./delivery_dashboard_routes/CancelledDelivery";
import TotalEarning from "./delivery_dashboard_routes/TotalEarning";
import ManageProfile from "./delivery_dashboard_routes/ManageProfile";
import Footer from "./Footer";
const DeliveryGuyDashboard = () => {
    return (
        <section className="bg-gray-50 min-h-screen h-full">
            <div className="w-container_width mx-auto py-10 grid grid-cols-4 gap-5">
                <div className="shadow bg-white rounded-lg ">
                    <div className="items-center rounded-lg flex flex-col space-y-2 bg-green p-5">
                        <img
                            src={profile}
                            className="w-16 h-16 rounded-full object-cover "
                            alt=""
                        />
                        <p className="text-gray-50 font-bold">
                            Hey delivery guy
                        </p>
                        <p className="text-gray-100">+254769761893</p>
                    </div>
                    <div>
                        <div className="py-5 px-2">
                            <Link to="/dashboard/delivery/">
                                <li className=" hover:bg-gray-200 p-2 rounded-lg list-none flex space-x-3 items-center ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    <span>Home</span>
                                </li>
                            </Link>
                            <Link to="/dashboard/delivery/assigned_delivery">
                                <li className="hover:bg-gray-200 p-2 rounded-lg list-none  flex space-x-3 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>

                                    <span>Assigned delivery</span>
                                </li>
                            </Link>
                            <Link to="/dashboard/delivery/pickup_station">
                                <li className="hover:bg-gray-200 p-2 rounded-lg list-none flex space-x-3 items-center ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                    <span>Pick up station</span>
                                </li>
                            </Link>
                            <Link to="/dashboard/delivery/completed_delivery">
                                <li className="hover:bg-gray-200 p-2 rounded-lg list-none flex space-x-3 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                    <span>Completed delivery</span>
                                </li>
                            </Link>
                            <Link to="/dashboard/delivery/pending_delivery">
                                <li className="hover:bg-gray-200 p-2 rounded-lg list-none flex space-x-3 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                    <span>Pending delivery</span>
                                </li>
                            </Link>
                            <Link to="/dashboard/delivery/cancelled_delivery">
                                <li className="hover:bg-gray-200 p-2 rounded-lg list-none flex space-x-3 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                    <span>Cancelled delivery</span>
                                </li>
                            </Link>{" "}
                            <Link to="/dashboard/delivery/total_earning">
                                <li className="hover:bg-gray-200 p-2 rounded-lg list-none flex space-x-3 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                    <span>Total earnings</span>
                                </li>
                            </Link>
                            <Link to="/dashboard/delivery/manage_profile">
                                <li className="hover:bg-gray-200 p-2 rounded-lg list-none flex space-x-3 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                    <span>Manage profile</span>
                                </li>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 bg-white shadow rounded p-3">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="assigned_delivery"
                            element={<AssignedDelivery />}
                        />
                        <Route path="pickup_station" element={<PickUp />} />
                        <Route
                            path="/completed_delivery"
                            element={<CompletedDelivery />}
                        />
                        <Route
                            path="/pending_delivery"
                            element={<PendingDelivery />}
                        />
                        <Route
                            path="/cancelled_delivery"
                            element={<CancelledDelivery />}
                        />
                        <Route
                            path="/total_earning"
                            element={<TotalEarning />}
                        />
                        <Route
                            path="/manage_profile"
                            element={<ManageProfile />}
                        />
                    </Routes>
                </div>
            </div>

            <Footer />
        </section>
    );
};

export default DeliveryGuyDashboard;
