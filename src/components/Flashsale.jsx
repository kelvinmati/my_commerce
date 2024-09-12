import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { getSingleProduct } from "../redux/actions/ProductsActions";
import toast from "react-hot-toast";
// install Swiper modules
SwiperCore.use([Navigation]);

const Flashsale = () => {
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state?.Products?.loading);

  // view individual product
  const handleProductView = (id) => {
    navigate(`/product_view/${id}`);
  };

  // fetch flashsales
  const [flashsaleProducts, setFlashsaleProducts] = useState([]);
  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      getFlashSales();
    }
    return () => (subscribed = false);
  }, []);
  const getFlashSales = async () => {
    try {
      const response = await axios.get(
        "https://api-v1.lufumart.com/api/v1/product-promotions/lufumart-app/flash-sale-promotions"
      );
      const data = await response.data;
      setFlashsaleProducts(data?.products);
    } catch (error) {
      console.log(error.message);
    }
  };
  const totalFlashsales = flashsaleProducts?.length;

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
    <section className="py-6 bg-uniform_grey">
      <div className="w-mobile md:w-container_width mx-auto">
        <h2 className="sm:text-2xl text-center mb-8">
          {isEnglish ? "FLASH SALE" : "VENTE FLASH"}
        </h2>
        <Swiper
          // install Swiper modules
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={2}
          navigation={false}
          //   onSwiper={(swiper) => console.log(swiper)}
          //   onSlideChange={() => console.log("slide change")}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1240: {
              slidesPerView: 6,
            },
          }}
        >
          <div onClick={() => swiperRef.current.swiper.slidePrev()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // className="h-10 w-10  p-2 bg-white border hover:bg-gray-200  rounded-full cursor-pointer absolute top-[43%] z-50 left-0"
              className={
                totalFlashsales <= 6
                  ? "hidden"
                  : "h-10 w-10  p-2 bg-white border hover:bg-gray-200  rounded-full cursor-pointer absolute top-[43%] z-50 left-0"
              }
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
              className={
                totalFlashsales <= 6
                  ? "hidden"
                  : "h-10 w-10 p-2 bg-white border hover:bg-gray-200  rounded-full cursor-pointer absolute top-[43%] z-50 right-0"
              }
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
          {isLoading ? (
            <main className=" bg-full text-center mt-5 ">
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
            <>
              {flashsaleProducts?.map((flashsaleProduct) => {
                const { _id, name, salePrice, imageUrl, translations } =
                  flashsaleProduct;
                const french = translations[0]?.fr[0];
                const english = translations[0]?.en[0];
                return (
                  <SwiperSlide
                    key={_id}
                    className="bg-white p-2.5 rounded space-y-3 "
                  >
                    <div
                      onClick={() => handleProductView(_id)}
                      className="h-36 flex justify-center cursor-pointer"
                    >
                      <img src={imageUrl[0]} alt="" />
                    </div>
                    <div>
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis	">
                        {isEnglish ? english.name : french.name}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-green">
                        $ {salePrice}
                      </p>
                      <svg
                        // onClick={() => alert("Clicked")}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-orange z-50"
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
                    </div>
                  </SwiperSlide>
                );
              })}
            </>
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default Flashsale;
