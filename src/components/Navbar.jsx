import React, { useState, useEffect, Fragment, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMoreProductsBySubcategory,
  getCategories,
  getLanguage,
  getSubCategoryByCategory,
  getUserCartItems,
  searchProduct,
} from "../redux/actions/ProductsActions";
import { logout } from "../redux/actions/AuthActions";
// import SidebarItem from "./SidebarItem";

const Navbar = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  //   category and navbar state
  const [isFixed, setisFixed] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hideCategories, setHideCategories] = useState(false);
  const [title, setTitle] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [openSearch, setOpenSearch] = useState(false);
  // getting all the categories from state
  const categories = useSelector((state) => state?.Products?.categories);

  const categoriesLoading = useSelector((state) => state?.Products?.loading);
  // console.log("Loading is", categoriesLoading);
  // getting all the sub-categories from state
  const subCategories = useSelector((state) => state?.Products?.sub_categories);
  // console.log("subCategories are", subCategories);

  // auth state
  // check if user is authenticated
  const [dashboard, setDashboard] = useState("");
  const [signUp, setSignUp] = useState("");

  const auth = useSelector((state) => state.auth.isAuthenticated);
  // console.log("Auth", auth);

  // dispatch categories
  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      loadCategories();
    }
    return () => (subscribed = false);
  }, []);

  const loadCategories = useCallback(() => {
    dispatch(getCategories());
  });

  // cart totals
  useEffect(() => {
    dispatch(getUserCartItems());
  }, []);
  const [cartTotal, setCartTotal] = useState(null);
  const CartItems = useSelector((state) => state.Products.cart.cartProducts);
  let totalCartItems = CartItems && CartItems.length;
  // console.log(totalCartItems);
  useEffect(() => {
    if (auth) {
      setCartTotal(totalCartItems);
    } else {
      setCartTotal(0);
    }
  }, [auth, totalCartItems]);

  // function to set navbar fixed on scroll
  const fixedNav = () => {
    window.addEventListener("scroll", () => {
      let height = window.scrollY;
      if (height > 100) {
        setisFixed(true);
      } else setisFixed(false);
    });
  };
  fixedNav();

  useEffect(() => {
    if (auth) {
      setDashboard("Dashboard");
      setSignUp("Logout");
      setIsAuth(true);
    } else {
      setDashboard("Register");
      setSignUp("Login");
      setIsAuth(false);
    }
  }, [auth]);

  const handleDashboard = () => {
    if (dashboard === "Register") {
      navigate("/register/customer");
    } else {
      navigate("/dashboard/customer");
    }
  };

  const handleSignUp = () => {
    if (signUp === "Logout") {
      dispatch(logout());
      // navigate("/login/customer");
    } else {
      navigate("/login/customer");
    }
  };
  // functions to show and hide categories and sub_categories
  const handleShowSubCtegories = (id, name) => {
    dispatch(getSubCategoryByCategory(id));
    setHideCategories(true);
    setTitle(name);
  };
  const handleProductSubCategiesView = (id, name) => {
    setHideCategories(false);
    setMenu(false);
    navigate(`/sub_prd/${id}/${name}`);
    dispatch(clearMoreProductsBySubcategory());
  };

  const handleToggle = () => {
    if (isAuth) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      navigate("/login/customer");
    }
  };
  const enterDashboard = () => {
    navigate("/dashboard/customer");
    setIsDropdownOpen(false);
  };
  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };
  // products search functionality
  const [searchedTerm, setSearchedTerm] = useState("");
  const getSearchedTerm = (e) => {
    // console.log(e.target.value);
    setSearchedTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchProduct(searchedTerm));
  };
  const term = useSelector((state) => state?.Products?.searched_products);
  // console.log("Results are", term);
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
    <section
      className={
        isFixed
          ? "  bg-white h-[85px]  z-50  fixed left-0 right-0 top-0  border-b-[1px] border-gray-200"
          : " bg-white h-[85px] z-50 border-b-[1px]"
      }
    >
      <div className=" relative w-mobile h-full sm:w-container_width mx-auto flex justify-between items-center space-x-6">
        <div className="text-orange" onClick={() => setMenu(!menu)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 sm:hidden block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              // d="M4 6h16M4 12h16M4 18h16"
              d={menu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </div>
        <Link to="/">
          <div>
            <img
              src="https://res.cloudinary.com/lufumart-ecommerce/image/upload/q_auto/c_scale,w_187,h_29/v1649943020/lufumart-logo/Lufumart_Logo_owimai.png"
              alt=""
            />
          </div>
        </Link>

        <div
          className="hidden sm:block text-orange relative md:flex items-center space-x-1 cursor-pointer"
          onClick={() => setMenu(!menu)}
        >
          <h2 className=" text-lg ">
            {isEnglish ? "Categories" : "catégories"}
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={
              menu
                ? "h-5 w-5 rotate-180 transition"
                : "h-5 w-5 rotate-0 transition"
            }
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              // d={menu ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div
          className={
            openSearch
              ? " absolute top-[85px] z-50 w-[90%]  "
              : "flex-auto hidden sm:block"
          }
        >
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                // required
                placeholder={
                  isEnglish
                    ? "search products here...."
                    : "rechercher des produits ici..."
                }
                className="border p-2.5 w-full rounded-full outline-green"
                onChange={getSearchedTerm}
              />
              <input
                type="submit"
                className="border p-2.5 absolute right-0 rounded-tr-full rounded-br-full bg-green text-white cursor-pointer   "
                value={isEnglish ? "Search" : "Chercher"}
              />
            </div>
          </form>
        </div>
        <div className=" flex items-center space-x-2 ">
          <div>
            <button
              onClick={handleSignUp}
              className="bg-gray-100  p-2 rounded hidden sm:block "
            >
              {signUp}
            </button>
          </div>
          <div>
            <button
              onClick={handleDashboard}
              className="bg-gray-100  p-2 rounded hidden sm:block "
            >
              {dashboard}
            </button>
          </div>
          <div>
            <svg
              onClick={() => setOpenSearch(!openSearch)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-orange sm:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  openSearch
                    ? "M6 18L18 6M6 6l12 12"
                    : "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                }
              />
            </svg>
          </div>

          <div className="relative">
            <svg
              onClick={handleToggle}
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-orange sm:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isAuth
                    ? "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                    : "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                }
              />
            </svg>
            <div
              className={
                isDropdownOpen
                  ? "md:hidden block  z-50 absolute -left-16 top-14 w-[153px]    space-y-2 bg-white p-2 shadow rounded-bl-xl"
                  : "hidden"
              }
            >
              <button
                onClick={handleLogout}
                className="p-1.5 bg-orange text-white rounded w-full"
              >
                Logout
              </button>
              <button
                onClick={enterDashboard}
                className="p-1.5  bg-orange text-white rounded w-full"
              >
                Dashboard
              </button>
            </div>
          </div>

          <Link to="/cart">
            <div className="text-orange  relative ml-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              <div className="absolute -top-3 left-4 bg-orange text-white w-5 h-5 rounded-full flex items-center justify-center p-2">
                <span>{cartTotal || 0}</span>
              </div>
            </div>
          </Link>
        </div>
        {/* <div className="relative">
          <svg
            onClick={() => setisLangClicked(!isLangClicked)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=" text-orange w-7 h-7 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              // d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
              d={
                isLangClicked
                  ? "M6 18L18 6M6 6l12 12"
                  : "M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
              }
            />
          </svg>
          <div
            className={
              isLangClicked
                ? "absolute -left-14 top-[55px]  bg-black text-white"
                : "hidden"
            }
          >
            <div className="absolute right-2  -top-2  rotate-45 w-5 h-5 bg-black"></div>
            <p
              onClick={() => dispatch(getLanguage())}
              className="px-5 my-1.5 cursor-pointer"
            >
              Eng
            </p>
            <p className="px-5 my-1.5 cursor-pointer">French</p>
          </div>
        </div> */}
        <div
          // onMouseLeave={() => setMenu(false)}
          className={
            menu
              ? "sm:shadow  h-[100vh] sm:h-[60vh]  overflow-auto  w-[270px] bg-white text-black z-50  absolute md:left-[180px] translate-x-[-32px] md:translate-x-0 border-r   top-[85px] transition"
              : "md:hidden translate-x-[-300px] h-screen overflow-auto w-[250px] absolute  bg-white top-[85px] transition z-50"
          }
        >
          <h2 className="p-2 text-xl text-orange border-b-2 border-dashed sm:hidden block">
            Categories
          </h2>
          {categoriesLoading ? (
            <main className=" w-full text-center mt-10 ">
              <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </main>
          ) : (
            <div>
              {categories?.map((category) => {
                const { name, _id, translations } = category;
                const english = translations[0]?.en[0];
                const french = translations[0]?.fr[0];

                return (
                  <ul
                    key={_id}
                    className={hideCategories ? "hidden" : "block  "}
                  >
                    <div
                      onClick={() =>
                        handleShowSubCtegories(
                          _id,
                          isEnglish ? english?.name : french?.name
                        )
                      }
                      className="flex justify-between items-center p-1.5 hover:bg-gray-50 cursor-pointer"
                    >
                      <li>{isEnglish ? english.name : french.name}</li>
                      <svg
                        className="h-5 w-5 text-orange"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </ul>
                );
              })}
              <div className={hideCategories ? "block" : "hidden"}>
                <div
                  onClick={() => setHideCategories(false)}
                  className="flex  space-x-5 items-center cursor-pointer p-2   bg-orange font-bold text-white"
                >
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
                      d="M11 17l-5-5m0 0l5-5m-5 5h12"
                    />
                  </svg>
                  <p> {title}</p>
                </div>
                <ul className="bg-white">
                  {subCategories?.map((sub) => {
                    const { name, _id, translations } = sub;
                    const english = translations[0]?.en[0];
                    const french = translations[0]?.fr[0];
                    return (
                      <li
                        key={_id}
                        onClick={() =>
                          handleProductSubCategiesView(
                            _id,
                            isEnglish ? english?.name : french?.name
                          )
                        }
                        className="py-1.5 mx-3  hover:text-orange  cursor-pointer"
                      >
                        {isEnglish ? english?.name : french?.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
