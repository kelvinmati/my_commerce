import React, { useEffect, useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMoreProducts } from "../redux/actions/ProductsActions";
const Explore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subscribed = useRef(false);
  useEffect(() => {
    subscribed.current = true;
    if (subscribed) {
      loadProducts();
    }
    return () => {
      subscribed.current = false;
    };
  }, []);
  const loadProducts = useCallback(() => {
    dispatch(getMoreProducts());
  }, []);

  const moreProducts = useSelector((state) => state?.Products?.more_products);

  const isLoading = useSelector(
    (state) => state?.Products?.more_products_loading
  );
  console.log("loading is", isLoading);
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
    <section className="bg-uniform_grey py-5">
      <div className=" space-y-5 w-mobile sm:w-container_width mx-auto">
        <h2 className="text-2xl text-center">
          {isEnglish ? "EXPLORE PRODUCTS" : "EXPLOREZ LES PRODUITS"}
        </h2>
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
          <div className=" grid  grid-cols-2 md:grid-cols-6 gap-3">
            {moreProducts?.map((moreProduct) => {
              const { name, _id, salePrice, imageUrl, translations } =
                moreProduct;
              const english = translations[0]?.en[0]?.name;
              const french = translations[0]?.fr[0]?.name;
              return (
                <div key={_id} className="bg-white p-2.5 rounded space-y-3">
                  <div
                    onClick={() => navigate(`/product_view/${_id}`)}
                    className="h-36 flex justify-center cursor-pointer"
                  >
                    <img src={imageUrl[0]} alt="" />
                  </div>
                  <div>
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {isEnglish ? english : french}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-green">
                      $ {salePrice}
                    </p>
                    <svg
                      // onClick={() => alert("Clicked")}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange "
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
                </div>
              );
            })}
          </div>
        )}
        <div className="w-full  text-center flex justify-center">
          <button
            onClick={() => dispatch(getMoreProducts())}
            className="flex space-x-3 items-center justify-center  bg-green text-white px-4 py-2 rounded"
          >
            <span className="text-lg">
              {isEnglish ? "Load more" : "Charger plus"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Explore;
const loop = [1, 2, 3, 4, 5, 6];
