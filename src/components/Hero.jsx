import React, { useRef, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

import { getProducts } from "../redux/actions/ProductsActions";
// install Swiper modules
SwiperCore.use([Navigation, Autoplay, Pagination]);

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  //   get products from redux
  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      loadProducts();
    }
    return () => (subscribed = false);
  }, []);
  const loadProducts = useCallback(() => {
    dispatch(getProducts());
  }, []);

  const loadedProducts = useSelector((state) => state?.Products?.products);
  // console.log("loadedProducts are ", loadedProducts);
  // get only four products for amazing deals
  const filtereredProducts = loadedProducts?.slice(16);
  // console.log("filtereredProducts  are", filtereredProducts);
  const isLoading = useSelector((state) => state?.Products?.loading);

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
    <section className="bg-uniform_grey sm:py-4 py-0 pb-10 h-full">
      <div className="w-mobile sm:w-container_width h-full mx-auto sm:grid sm:grid-cols-4 flex flex-col space-y-5 sm:space-y-0">
        <div className="bg-white p-2 h-full w-full sm:flex sm:flex-col justify-center space-y-5 hidden">
          <div>
            {" "}
            <h2 className="text-lg bg-orange text-white rounded-lg text-center animate-bounce py-2">
              {isEnglish
                ? "Enjoy amazing deals!!"
                : "Profitez d'offres incroyables!!"}
            </h2>
          </div>
          {isLoading ? (
            <main className=" w-full text-center mt-5 ">
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
            <div className="grid grid-cols-2 gap-3">
              {filtereredProducts?.map((filtereredProduct) => {
                const { translations, _id, imageUrl, name } = filtereredProduct;

                const english = translations[0]?.en[0]?.name;
                const french = translations[0]?.fr[0]?.name;

                return (
                  <div
                    key={_id}
                    onClick={() => navigate(`/product_view/${_id}`)}
                    className="bg-white shadow-lg p-1.5 rounded space-y-2 cursor-pointer"
                  >
                    <div className="flex justify-center  h-10 bg-white">
                      <img
                        src={imageUrl[0]}
                        alt={isEnglish ? english : french}
                      />
                    </div>
                    <h2 className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {isEnglish ? english : french}
                    </h2>
                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-black text-white flex space-x-3 justify-center items-center p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-orange"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h2 className=" my-2">
                {isEnglish ? "BECOME A SELLER" : "DEVENEZ VENDEUR"}
              </h2>
              <button className="  bg-green text-white rounded-lg p-2">
                <a
                  target="_blank"
                  href="https://play.google.com/store/search?q=lufumart&c=apps"
                >
                  {isEnglish ? "Get started" : "Commencer"}
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-green rounded-lg sm:h-[400px] h-[150px]  flex w-full">
          <Swiper
            // install Swiper modules
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={false}
            pagination={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            //   onSwiper={(swiper) => console.log(swiper)}
            //   onSlideChange={() => console.log("slide change")}
          >
            <div onClick={() => swiperRef.current.swiper.slidePrev()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10  p-2 bg-white border hover:bg-gray-200  rounded-full cursor-pointer absolute top-[43%] z-50 left-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <div onClick={() => swiperRef.current.swiper.slideNext()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 p-2 bg-white border hover:bg-gray-200  rounded-full cursor-pointer absolute top-[43%] z-50 right-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            {images.map((image, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="h-full flex justify-center w-full "
                >
                  <img
                    src={image.img}
                    alt=""
                    className="rounded-lg sm:rounded-none"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="bg-white rounded p-2.5 pt-4 h-full w-full flex flex-col justify-center space-y-5 sm:hidden">
          <div>
            {" "}
            <h2 className="text-lg bg-orange text-white rounded-lg text-center animate-bounce py-2">
              {isEnglish
                ? "Enjoy amazing deals!!"
                : "Profitez d'offres incroyables!!"}
            </h2>
          </div>
          {isLoading ? (
            <main className=" w-full text-center mt-5 ">
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
            <div className="grid grid-cols-2 gap-3">
              {filtereredProducts?.map((filtereredProduct) => {
                const { translations, _id, imageUrl, name } = filtereredProduct;

                const english = translations[0]?.en[0]?.name;
                const french = translations[0]?.fr[0]?.name;

                return (
                  <div
                    key={_id}
                    onClick={() => navigate(`/product_view/${_id}`)}
                    className="bg-white shadow-lg p-1.5 rounded space-y-2 cursor-pointer "
                  >
                    <div className="flex justify-center  h-24 bg-white">
                      <img
                        src={imageUrl[0]}
                        alt={isEnglish ? english : french}
                        className=""
                      />
                    </div>
                    <h2 className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {isEnglish ? english : french}
                    </h2>
                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-black text-white flex space-x-3 justify-center items-center p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-orange"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h2 className=" my-2">
                {isEnglish ? "BECOME A SELLER" : "DEVENEZ VENDEUR"}
              </h2>
              <button className="  bg-green text-white rounded-lg p-2">
                <a
                  target="_blank"
                  href="https://play.google.com/store/search?q=lufumart&c=apps"
                >
                  {isEnglish ? "Get started" : "Commencer"}
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
const images = [
  {
    img: "https://demo.activeitzone.com/ecommerce/public/uploads/all/qQR6fBE9MAjTWuIzGkZeI2wTDYAlIeBKQaezchPM.jpg",
  },
  {
    img: "https://demo.activeitzone.com/ecommerce/public/uploads/all/jJjPcgUsldYlpgdxpKBKmR6gIwtXIcuYtxeloijR.jpg",
  },

  // {
  //   img: "https://res.cloudinary.com/lufumart-ecommerce/image/upload/v1652741977/yqfepytspfotq9ckvjmg.jpg",
  // },
  {
    img: "https://s.alicdn.com/@img/imgextra/i2/O1CN01rYC4hI1lJzSxuJUm1_!!6000000004799-2-tps-990-400.png",
  },
  {
    img: "https://demo.activeitzone.com/ecommerce/public/uploads/all/qQR6fBE9MAjTWuIzGkZeI2wTDYAlIeBKQaezchPM.jpg",
  },
];

const deals = [1, 2, 3, 4];
