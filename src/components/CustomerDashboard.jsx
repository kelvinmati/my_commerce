import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import profile from "../../images/profile.png";
import Home from "./customer_dashboard_routes/Home";
import Wishlist from "./customer_dashboard_routes/Wishlist";
import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "../redux/actions/AuthActions";
import Orders from "./customer_dashboard_routes/Orders";
import Settings from "./customer_dashboard_routes/Settings";
const CustomerDashboard = ({ setIsLanguagePopUpOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location?.pathname;
  const currentUser = useSelector((state) => state.auth.customer.current_user);
  console.log("current user is", currentUser);
  useEffect(() => {
    dispatch(userAuth());
  }, []);

  // console.log("active is", active);
  // get language
  const language = useSelector((state) => state?.Products?.language);
  const [isEnglish, setIsEnglish] = useState(false);
  // console.log("language is", language);
  useEffect(() => {
    if (language === "french") {
      setIsEnglish(false);
    } else {
      setIsEnglish(true);
    }
  }, [language]);
  return (
    <section className="w-full  py-10 bg-uniform_grey">
      <div className="md:hidden z-50 fixed bottom-0 bg-green text-white w-full  grid grid-cols-3 ">
        <Link
          className={
            path === "/dashboard/customer"
              ? "flex flex-col  items-center p-2 space-y-1 bg-white text-black"
              : "flex flex-col  items-center p-2 space-y-1 bg-green"
          }
          to="/dashboard/customer"
        >
          <div className="flex flex-col  items-center p-2 space-y-1">
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
            <p>{isEnglish ? "Home" : "Maison"}</p>
          </div>
        </Link>
        <Link
          to="/dashboard/customer/orders"
          className={
            path === "/dashboard/customer/orders"
              ? "flex flex-col  items-center p-2 space-y-1 bg-white text-black"
              : "flex flex-col  items-center p-2 space-y-1 bg-green"
          }
        >
          <div className="flex flex-col  items-center p-2 space-y-1">
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
            <p>Orders</p>
          </div>{" "}
        </Link>
        {/* <Link
          onMouseEnter={() => setActive(true)}
          to="/dashboard/customer/wishlist"
        >
          <div className="flex flex-col  items-center p-2 space-y-1">
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
            <p>Wishlist</p>
          </div>
        </Link> */}
        <Link
          className={
            path === "/dashboard/customer/settings"
              ? "flex flex-col  items-center p-2 space-y-1 bg-white text-black"
              : "flex flex-col  items-center p-2 space-y-1 bg-green"
          }
          to="/dashboard/customer/settings"
        >
          <div className="flex flex-col  items-center p-2 space-y-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <p>{isEnglish ? "Settings" : "Réglages"}</p>
          </div>
        </Link>
      </div>
      <div className="h-auto w-mobile md:w-container_width  grid sm:grid-cols-9 gap-7  mx-auto  ">
        <div className="w-full  bg-white shadow rounded  sm:col-span-2 hidden md:block">
          <div className="items-center  flex flex-col space-y-2 bg-green p-5">
            <img
              src={profile}
              className="w-16 h-16 rounded-full object-cover "
              alt=""
            />
            <p className="text-gray-50 font-bold"> {currentUser?.name}</p>
            <p className="text-gray-100">+254769761893</p>
          </div>
          <div className="py-5 px-2 ">
            <Link to="/dashboard/customer/">
              <li className=" hover:shadow p-2 rounded-lg list-none flex space-x-3 items-center ">
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
                <span className="">{isEnglish ? "Home" : "Maison"}</span>
              </li>
            </Link>
            <Link to="/dashboard/customer/orders">
              <li className="hover:shadow p-2 rounded-lg list-none  flex space-x-3 items-center">
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

                <span className="">{isEnglish ? "Orders" : "Ordres"}</span>
              </li>
            </Link>
            {/* <Link to="/dashboard/customer/wishlist">
              <li className="hover:shadow p-2 rounded-lg list-none flex space-x-3 items-center ">
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
                <span className="">Wishlist</span>
              </li>
            </Link> */}
            <Link to="/dashboard/customer/settings">
              <li className="hover:shadow p-2 rounded-lg list-none flex space-x-3 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <span className="">{isEnglish ? "Settings" : "Réglages"}</span>
              </li>
            </Link>
          </div>
        </div>
        <div className="w-full sm:col-span-7">
          <Routes>
            <Route path="/" element={<Home currentUser={currentUser} />} />
            <Route path="/orders/*" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route
              path="/settings"
              element={
                <Settings setIsLanguagePopUpOpen={setIsLanguagePopUpOpen} />
              }
            />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default CustomerDashboard;
