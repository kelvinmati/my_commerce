import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsByCategory,
  resetProdyctsByCategory,
} from "../redux/actions/ProductsActions";
import { useParams, useNavigate } from "react-router-dom";
const CategoryProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, category_name } = useParams();
  const handleProductView = (id) => {
    dispatch(resetProdyctsByCategory());
    navigate(`/product_view/${id}`);
  };
  // get products by category
  const [currentPage, setCurrentPage] = useState(2);
  const params = {
    categoryId: id,
    page: 1,
  };
  const loadMoreParams = {
    categoryId: id,
    page: currentPage,
  };
  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      loadProductsByCategory();
    }
    return () => (subscribed = false);
  }, []);
  const loadProductsByCategory = useCallback(() => {
    dispatch(getProductsByCategory(params));
  });

  const categoryProducts = useSelector(
    (state) => state?.Products?.category_products
  );
  console.log("categoryProducts are", categoryProducts);
  // Total category products
  const totalCategoryProducts = useSelector(
    (state) => state?.Products?.total_category_products
  );
  console.log("totalCategoryProducts is", totalCategoryProducts);
  const [isZero, setIsZero] = useState(false);
  useEffect(() => {
    if (totalCategoryProducts === 0) {
      setIsZero(true);
    } else {
      setIsZero(false);
    }
  }, [totalCategoryProducts]);
  // loading more spinner
  const loading = useSelector((state) => state?.Products?.products_loading);
  console.log("loading state is", loading);
  // function to load more products
  const handleLoadMore = () => {
    setCurrentPage((currentPage) => currentPage + 1);
    dispatch(getProductsByCategory(loadMoreParams));
  };
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
    <section className="bg-uniform_grey py-10">
      <div className="w-mobile md:w-container_width mx-auto">
        <div className=" space-y-2 pb-5  ">
          <h2 className="text-xl font-bold border-b-[2px] border-dashed border-black py-1">
            {category_name}
          </h2>
        </div>
        {categoryProducts?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {categoryProducts?.map((categoryProduct) => {
              const { _id, imageUrl, salePrice, name } = categoryProduct;

              return (
                <div key={_id} className="bg-white p-2.5 rounded space-y-3">
                  <div
                    onClick={() => handleProductView(_id)}
                    className="h-36 flex justify-center cursor-pointer"
                  >
                    <img src={imageUrl[0]} alt={name} />
                  </div>
                  <div>
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {name}
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
        ) : (
          <div>
            <h2>No products at the moment</h2>
          </div>
        )}

        <div
          className={
            totalCategoryProducts > 0
              ? "w-full  text-center flex justify-center pt-5"
              : "hidden"
          }
        >
          <button
            onClick={handleLoadMore}
            // onClick={() => dispatch(getProductsByCategory(params))}
            className="flex space-x-3 items-center justify-center  bg-green  text-white px-4 py-2 rounded"
            // disabled={isZero ? true : false}
          >
            {loading ? (
              <div className="flex space-x-2 items-center">
                <span className="w-7 h-7 border-2 border-r-gray-500 animate-spin rounded-full"></span>
                <span>Loading..</span>
              </div>
            ) : (
              <>
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
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryProducts;
