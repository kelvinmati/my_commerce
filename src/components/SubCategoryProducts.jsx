// import React, { useEffect, useCallback, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getMoreProductsBySubCategory,
//   // getMoreProductsByCategory,
//   getProductBySubCategory,
//   getSingleProduct,
//   getSubCategoryByCategory,
// } from "../redux/actions/ProductsActions";
// import { useNavigate } from "react-router-dom";

// const SubCategoryProducts = () => {
//   const { id, sub_name } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // get products by subcategories
//   // useEffect(() => {
//   //   let subscribed = true;
//   //   if (subscribed) {
//   //     loadProductsBySubcategory();
//   //   }
//   //   return () => (subscribed = false);
//   // }, [id]);
//   // // prevent re-renders
//   // const loadProductsBySubcategory = useCallback(() => {
//   //   dispatch(getProductBySubCategory(id));
//   // });
//   // const productBySubCategories = useSelector(
//   //   (state) =>
//   //     state?.Products?.sub_category_products?.subCategories[0]?.products
//   // );

//   // navigate to product details
//   const handleProductView = (id) => {
//     dispatch(getSingleProduct(id));
//     navigate(`/product_view/${id}`);
//   };
//   const productSubcategories = useSelector(
//     (state) =>
//       state?.Products?.sub_category_products?.subCategories[0]?.products
//   );
//   console.log("productSubcategories", productSubcategories);
//   useEffect(() => {
//     dispatch(getProductBySubCategory(id));
//   }, []);
//   // get more products by sub-category
//   // const productBySubCategories = useSelector(
//   //   (state) => state?.Products?.more_sub_category_products
//   // );
//   // console.log("productBySubCategories are", productBySubCategories);
//   // const [page, setPage] = useState(1);
//   // const params = {
//   //   subCategoryId: id,
//   //   page: page,
//   // };
//   // useEffect(() => {
//   //   // setPage(page + 1);
//   //   setPage((prevState) => prevState + 1);
//   //   dispatch(getMoreProductsBySubCategory(params));
//   // }, []);

//   // const handleLoadMore = () => {
//   //   setPage((prevState) => prevState + 1);
//   //   // setPage(page + 1);
//   //   dispatch(getMoreProductsBySubCategory(params));
//   // };

//   // get total products
//   const totalProducts = productBySubCategories?.length;
// // get language
// const language = useSelector((state) => state?.Products?.language);
// const [isEnglish, setIsEnglish] = useState(false);
// // console.log("language is", language);
// useEffect(() => {
//   if (language === "french") {
//     setIsEnglish(false);
//   } else {
//     setIsEnglish(true);
//   }
// }, [language]);
//   return (
//     <section className=" py-5 md:py-16 bg-uniform_grey space-y-2">
//       <div className=" space-y-2 pb-5 w-mobile md:w-container_width mx-auto">
//         <h2 className="text-xl font-bold border-b-[2px] border-dashed border-black py-1">
//           {sub_name}
//         </h2>
//         <p>
//           Available products: <span>{totalProducts || 0}</span>
//         </p>
//       </div>
//       <div className=" grid  grid-cols-2 md:grid-cols-6 gap-3 w-mobile md:w-container_width mx-auto">
//         {productSubcategories?.length > 0 ? (
//           productSubcategories?.map((filteredPrd) => {
//             const { name, imageUrl, _id, salePrice } = filteredPrd;
//             return (
//               <div key={_id} className="bg-white p-2.5 rounded space-y-3">
//                 <div
//                   onClick={() => handleProductView(_id)}
//                   className="h-36 flex justify-center cursor-pointer"
//                 >
//                   <img src={imageUrl[0]} alt={name} />
//                 </div>
//                 <div>
//                   <p className="whitespace-nowrap overflow-hidden text-ellipsis">
//                     {name}
//                   </p>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <p className="text-lg font-bold text-green">$ {salePrice}</p>
//                   <svg
//                     // onClick={() => alert("Clicked")}
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-orange "
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="font-bold text-xl text-orange">
//             <h2>Comming soon..</h2>
//           </div>
//         )}
//       </div>
// <div className="w-full  text-center flex justify-center pt-5">
//   <button
//     onClick={handleLoadMore}
//     className="flex space-x-3 items-center justify-center  bg-green text-white px-4 py-2 rounded"
//   >
//     <span className="text-lg">
//       {isEnglish ? "Load more" : "Charger plus"}
//     </span>
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={1.5}
//       stroke="currentColor"
//       className="w-5 h-5"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
//       />
//     </svg>
//   </button>
// </div>
//     </section>
//   );
// };

// export default SubCategoryProducts;

import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMoreProductsBySubcategory,
  getMoreProductsBySubCategory,
  getSingleProduct,
} from "../redux/actions/ProductsActions";
import { useNavigate } from "react-router-dom";

const SubCategoryProducts = () => {
  const { id, sub_name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get products by subcategories

  // set page state

  const [currentPage, setCurrentPage] = useState(2);

  console.log("currentPage is", currentPage);
  const productBySubCategories = useSelector(
    (state) => state?.Products?.more_sub_category_products
  );
  // useEffect(() => {
  //   if (productBySubCategories?.length > 0) {
  //     setIsClicked(true);
  //   } else {
  //     setIsClicked(false);
  //   }
  // }, [productBySubCategories?.length]);

  const defaultParams = {
    subCategoryId: id,
    page: 1,
  };
  let params = {
    subCategoryId: id,
    page: currentPage,
  };
  useEffect(() => {
    dispatch(getMoreProductsBySubCategory(defaultParams));
  }, [defaultParams?.subCategoryId]);
  // get more products by sub-category

  // useEffect(() => {
  //   handleLoadMore();
  // }, [currentPage]);

  const handleLoadMore = () => {
    dispatch(getMoreProductsBySubCategory(params));
    // isClicked ? setCurrentPage(currentPage + 1) : setCurrentPage(2);
    setCurrentPage(currentPage + 1);
  };

  console.log("more_sub_category_products", productBySubCategories);

  // navigate to product details
  const handleProductView = (id) => {
    dispatch(getSingleProduct(id));
    navigate(`/product_view/${id}`);
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
    <section className=" py-5 md:py-16 bg-uniform_grey">
      <div className=" space-y-2 pb-5 w-mobile md:w-container_width mx-auto">
        <h2 className="text-xl font-bold border-b-[2px] border-dashed border-black py-1">
          {sub_name}
        </h2>
        {/* <p>
          Available products: <span>{totalProducts || 0}</span>
        </p> */}
      </div>
      <div className=" w-mobile md:w-container_width mx-auto">
        {productBySubCategories?.length > 0 ? (
          <div className="grid  grid-cols-2 md:grid-cols-6 gap-3">
            {productBySubCategories?.map((filteredPrd) => {
              const { name, imageUrl, _id, salePrice } = filteredPrd;
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
          <div className="font-bold text-xl text-orange">
            <h2>No products at the moment</h2>
          </div>
        )}
      </div>
      {productBySubCategories && (
        <div className="w-full  text-center flex justify-center pt-5">
          <button
            onClick={handleLoadMore}
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
      )}
    </section>
  );
};

export default SubCategoryProducts;
