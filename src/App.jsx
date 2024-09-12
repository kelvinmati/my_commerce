import React, { useEffect, useState, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import CustomerRegister from "./components/CustomerRegister";
import Banners from "./components/Banners";
import Subscribe from "./components/Subscribe";
import CustomerLogin from "./components/CustomerLogin";
import CustomerDashboard from "./components/CustomerDashboard";
import FeaturedBrands from "./components/FeaturedBrands";
import ProductView from "./components/ProductView";
import Cart from "./components/Cart";
import TopCategories from "./components/TopCategories";
// import Footer from "./components/Footer";
import DeliveryGuyDashboard from "./components/DeliveryGuyDashboard";
// import ElectronicDeals from "./components/deals/ElectronicDeals";
// import ForYou from "./components/deals/ForYou";
// import RecommendedSellers from "./components/RecommendedSellers";
import { Toaster } from "react-hot-toast";
import Hero from "./components/Hero";
import PrivateRoute from "./components/middleware/PrivateRoute";
import Checkout from "./components/Checkout";
import Navbar from "./components/Navbar";
import Flashsale from "./components/Flashsale";
import Newarrivals from "./components/Newarrivals";
import Featured from "./components/Featured";
// import MapComponent from "./components/MapComponent";
import Footer from "./components/Footer";
import SubCategoryProducts from "./components/SubCategoryProducts";
import CategoryProducts from "./components/CategoryProducts";

import { useDispatch } from "react-redux";
import { getLanguage } from "./redux/actions/ProductsActions";
import Explore from "./components/Explore";
import NetworkError from "./components/NetworkError";
function App() {
  const dispatch = useDispatch();
  const [isLanguagePopUpOpen, setIsLanguagePopUpOpen] = useState(false);
  let storedLang = localStorage.getItem("lang");
  useEffect(() => {
    if (storedLang) {
      setIsLanguagePopUpOpen(false);
    } else {
      setIsLanguagePopUpOpen(true);
    }
  }, [storedLang]);

  const handleLanguage = (e) => {
    let language = e.target.value;
    dispatch(getLanguage(language));
    setIsLanguagePopUpOpen(false);
  };
  return (
    <Fragment>
      <Router>
        <div>
          <Navbar />
          {/* <NetworkError /> */}

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Banners />
                  <FeaturedBrands />
                  <Newarrivals />
                  <Flashsale />
                  <TopCategories />
                  <Featured />
                  <Explore />
                  {/* <ForYou /> */}
                  {/* <RecommendedSellers /> */}
                  {/* <ElectronicDeals /> */}
                  <Subscribe />
                </>
              }
            />
            <Route path="/register/customer" element={<CustomerRegister />} />
            <Route path="/login/customer" element={<CustomerLogin />} />

            {/* <Route path="/map" element={<MapComponent />} /> */}

            <Route element={<PrivateRoute />}>
              <Route
                path="/dashboard/customer/*"
                element={
                  <CustomerDashboard
                    setIsLanguagePopUpOpen={setIsLanguagePopUpOpen}
                  />
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
            <Route
              path="/dashboard/delivery/*"
              element={<DeliveryGuyDashboard />}
            />
            <Route path="/product_view/:id" element={<ProductView />} />
            <Route
              path="/category_prd/:id/:category_name"
              element={<CategoryProducts />}
            />

            <Route
              path="/sub_prd/:id/:sub_name"
              element={<SubCategoryProducts />}
            />

            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </div>
        <Toaster />
      </Router>
      <section className={isLanguagePopUpOpen ? "block" : "hidden"}>
        <div className="bg-[rgba(0,0,0,0.7)] z-50 bg-blend-multiply w-screen h-screen fixed top-0  ">
          <div className="w-[90%] sm:w-[50%] h-[250px] mx-auto  bg-white rounded p-3 fixed left-0 right-0 top-[25%] z-50">
            <div>
              <img
                src="https://res.cloudinary.com/lufumart-ecommerce/image/upload/q_auto/c_scale,w_187,h_29/v1649943020/lufumart-logo/Lufumart_Logo_owimai.png"
                alt=""
              />
            </div>

            <h2 className="text-lg ">Choose your preffered language</h2>
            <h2 className="text-lg ">Choisissez votre langue préférée</h2>
            <div onChange={handleLanguage}>
              <div className="space-x-2">
                <input type="radio" value="french" name="lang" id="" />
                <label htmlFor="">French</label>
              </div>
              <div className="space-x-2">
                <input type="radio" value="english" name="lang" id="" />
                <label htmlFor="">English</label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default App;
