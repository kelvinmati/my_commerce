import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../redux/actions/ProductsActions";
import { useNavigate } from "react-router-dom";
const TopCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  // getting all the categories from state
  const categories = useSelector((state) => state.Products.categories);
  // console.log("categories are", categories);
  const loadingStatus = useSelector((state) => state.Products.loading);
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
    <section className="bg-uniform_grey py-7">
      <p className="sm:text-2xl text-center pb-7 ">
        {isEnglish ? "SHOP BY CATEGORIES" : "ACHETER PAR CATÉGORIES"}
      </p>
      {loadingStatus ? (
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
        <div className="w-mobile md:w-container_width mx-auto py-4 grid  grid-cols-2 md:grid-cols-4 gap-3 ">
          {categories &&
            categories.map(
              (category) => {
                const { translations, _id, imageUrl } = category;
                const english = translations[0]?.en[0];
                const french = translations[0]?.fr[0];
                return (
                  <div
                    onClick={() =>
                      navigate(
                        `/category_prd/${_id}/${
                          isEnglish ? english?.name : french?.name
                        }`
                      )
                    }
                    key={category._id}
                    className="md:flex p-2 md:p-0 md:space-x-4 space-y-3 px-2 justify-between items-center md:h-24 cursor-pointer shadow-sm bg-white rounded-lg  hover:shadow-lg"
                  >
                    <div className=" h-20 w-full   flex justify-center ">
                      <img
                        src={imageUrl}
                        alt={isEnglish ? english?.name : french?.name}
                      />
                    </div>
                    <div className=" w-full ">
                      <p>{isEnglish ? english?.name : french?.name}</p>
                    </div>
                    <div className="hidden md:block">
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                );
              }
              // <div
              //   onClick={() =>
              //     navigate(`/category_prd/${category?._id}/${category.name}`)
              //   }
              //   key={category._id}
              //   className="md:flex p-2 md:p-0 md:space-x-4 space-y-3 px-2 justify-between items-center md:h-24 cursor-pointer shadow-sm bg-white rounded-lg  hover:shadow-lg"
              // >
              //   <div className=" h-20 w-full   flex justify-center ">
              //     <img src={category.imageUrl} alt={category.name} />
              //   </div>
              //   <div className=" w-full ">
              //     <p>{category.name}</p>
              //   </div>
              //   <div className="hidden md:block">
              //     <svg
              //       xmlns="http://www.w3.org/2000/svg"
              //       className="h-6 w-6"
              //       fill="none"
              //       viewBox="0 0 24 24"
              //       stroke="currentColor"
              //       strokeWidth={2}
              //     >
              //       <path
              //         strokeLinecap="round"
              //         strokeLinejoin="round"
              //         d="M9 5l7 7-7 7"
              //       />
              //     </svg>
              //   </div>
              // </div>
            )}
        </div>
      )}
    </section>
  );
};

export default TopCategories;
