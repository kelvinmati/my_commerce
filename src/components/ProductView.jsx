import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart, getSingleProduct } from "../redux/actions/ProductsActions";

const ProductView = () => {
  const { id } = useParams();
  //   console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      dispatch(getSingleProduct(id));
    }
    return () => (subscribed = false);
  }, []);

  const productData = useSelector((state) => state?.Products?.product[0]);
  console.log("productData is", productData);
  // english translation
  const english = productData?.translations[0]?.en[0];
  console.log("English translation is", english);
  // french translation
  const french = productData?.translations[0]?.fr[0];
  console.log("French translation is", french);

  const loadingStatus = useSelector((state) => state.Products.loading);
  // console.log("The loading status  is", loadingStatus);

  // handle add to cart
  const token = localStorage.getItem("loginToken");

  const handleAddToCart = () => {
    if (token) {
      dispatch(addToCart(id));
      toast.success("Succesfully added to cart");
    } else {
      toast.error("Failed..Kindly login");
      navigate("/login/customer");
    }
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
    <>
      <section className=" h-full bg-white md:bg-gray-100 py-16 ">
        {loadingStatus ? (
          <main className=" w-full text-orange text-center mt-7">
            <div>Please wait</div>
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </main>
        ) : (
          <div className="  w-full md:w-container_width mx-auto rounded-lg md:shadow  bg-white h-auto p-3 ">
            <div className="grid md:grid-cols-3 gap-7 items-center ">
              <div className="flex overflow-auto">
                {productData?.imageUrl?.map((prdImg, index) => {
                  return (
                    <div
                      key={index}
                      className="h-80 min-w-full bg-white flex justify-center "
                    >
                      <img src={prdImg} alt="" />
                    </div>
                  );
                })}
              </div>

              <div className=" md:col-span-2  flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg text-orange ">
                    {isEnglish ? english?.name : french?.name}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green"
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

                <p className="text-2xl font-bold">
                  $ {productData?.salePrice.toLocaleString()}
                </p>
                <p className="text-sm">
                  {" "}
                  <s>$ {productData?.price.toLocaleString()}</s>
                </p>
                <p>
                  <b>Availability:</b>{" "}
                  {isEnglish ? english?.availability : french?.availability}
                </p>
                <p>
                  <b>Condition:</b>{" "}
                  {isEnglish ? english?.condition : french?.condition}
                </p>
                <p>
                  <b>Items left:</b> {productData?.quantity}
                </p>
                <p>{/* <b>Weight:</b> {productData?.weight} */}</p>

                <button
                  onClick={handleAddToCart}
                  className="bg-green p-2 rounded-xl w-1/2 text-white text-lg"
                >
                  {isEnglish ? "Add to cart" : "Ajouter au panier"}
                </button>
              </div>
            </div>
            <div className=" w-full mt-3 space-y-3">
              <p className="text-xl font-bold ">Description</p>
              <p>{isEnglish ? english?.description : french?.description}</p>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductView;
