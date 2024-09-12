import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addToCart,
  decreaseProdQty,
  getUserCartItems,
  removeProduct,
} from "../redux/actions/ProductsActions";

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let suscribed = true;
    if (suscribed) {
      dispatch(getUserCartItems());
    }
    return () => (suscribed = false);
  }, []);

  const CartItems = useSelector((state) => state?.Products?.cart?.cartProducts);
  // console.log("CartItems", CartItems);

  const totals = useSelector(
    (state) => state?.Products?.cart?.cartProductTotal
  );

  const Totals = totals && totals.subTotal;

  const itemQuantity = useSelector(
    (state) => state.Products.cart.cartProductQuantity
  );
  const loadingStatus = useSelector((state) => state.Products.loading);

  // increase cart product quantity
  const increaseCartProdQty = (e, id) => {
    e.preventDefault();
    dispatch(addToCart(id));
    toast.success("product quantity increased");
  };
  // increase cart product quantity

  const decreaseCartProdQty = (e, id) => {
    e.preventDefault();

    dispatch(decreaseProdQty(id));
  };
  // remove product from cart
  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };
  // Total cart items
  let totalCartItems = CartItems && CartItems.length;
  // get token
  const token = localStorage.getItem("loginToken");
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
      <section className=" min-h-[50vh] h-full  bg-gray-50 md:py-16 py-10 flex flex-col  items-center justify-center">
        {Totals === 0 || !token ? (
          <div className="space-y-8">
            <p className=" text-xl">Your cart is empty</p>
            <div>
              <Link to="/">
                <button className="p-4 bg-orange text-white rounded-lg">
                  Start shopping
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className=" w-[95%] md:w-container_width mx-auto  flex flex-col  md:grid md:grid-cols-3 gap-4 ">
            <div className="col-span-2 bg-white shadow  rounded pb-5">
              <div>
                {totalCartItems === 1 ? (
                  <p className="p-2  border-b-2 border-dashed text-xl  ">
                    {isEnglish
                      ? "There is 1 item in your cart"
                      : "Il y a 1 article dans votre panier"}
                  </p>
                ) : (
                  <p className="p-2  border-b-2 border-dashed text-2xl  ">
                    {isEnglish ? "There are" : "Il y a"} {totalCartItems || 0}{" "}
                    {isEnglish
                      ? "items in your cart"
                      : "Articles dans votre panier"}
                  </p>
                )}
              </div>
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
                <div className="space-y-5">
                  {CartItems &&
                    CartItems.map((item) => {
                      const { imageUrl, name, _id, salePrice, translations } =
                        item;

                      // translate to english
                      const english = translations[0]?.en[0];
                      // translate to french
                      const french = translations[0]?.fr[0];

                      const items =
                        itemQuantity &&
                        itemQuantity.find((item) => item.productId === _id);
                      const { quantity, vat } = items;

                      return (
                        <div
                          key={_id}
                          className="p-2 border-b-[1px] grid  grid-cols-4 gap-3 md:items-center  "
                        >
                          <div className="h-32  flex justify-center">
                            <img src={imageUrl[0]} alt="" />
                          </div>
                          <div className="col-span-3 grid grid-rows-2 gap-2 ">
                            <div className="text-orange text-lg">
                              <p>{isEnglish ? english.name : french.name}</p>
                            </div>
                            <div className=" flex justify-between items-center">
                              <div>
                                <p className="text-lg">
                                  $ {salePrice.toLocaleString()}
                                </p>
                                {/* <p className="text-sm">Vat: $ {vat}</p> */}
                              </div>
                              <div>
                                {" "}
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() =>
                                      decreaseCartProdQty(event, _id)
                                    }
                                    disabled={quantity <= 1 ? true : false}
                                    className={
                                      quantity <= 1
                                        ? "bg-gray-200 w-8 h-8 cursor-not-allowed  rounded-full"
                                        : "w-8 h-8 bg-gray-800 text-white  rounded-full "
                                    }
                                  >
                                    -
                                  </button>

                                  <span className="mx-2">{quantity}</span>
                                  <button
                                    onClick={() =>
                                      increaseCartProdQty(event, _id)
                                    }
                                    className="w-8 h-8 bg-gray-800 text-white rounded-full "
                                  >
                                    +
                                  </button>
                                  <div onClick={() => handleRemoveProduct(_id)}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-7 w-7 text-green cursor-pointer "
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div className=" bg-white h-full md:h-72 shadow-sm rounded ">
              <div>
                <p className="p-2  border-b-2 border-dashed text-xl  ">
                  {isEnglish ? "Cart summary" : "Récapitulatif du panier"}
                </p>
              </div>

              <div className=" p-3  space-y-2">
                <div className="flex justify-between">
                  <p className="text-lg">Subtotal</p>
                  <p className="text-xl ">
                    $ {(totals && totals.subTotal.toLocaleString()) || 0}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg">Vat</p>
                  <p className="text-xl ">
                    $ {(totals && totals.vat.toLocaleString()) || 0}
                  </p>
                </div>
                <div className="font-bold border-t-[1px] flex justify-between py-2">
                  <h2>Total</h2>
                  <h2>USD {totals?.total}</h2>
                </div>

                <p className="text-orange">
                  {isEnglish
                    ? "Delivery charges not included"
                    : "Frais de livraison non inclus"}
                </p>
                <div className="flex space-x-2 ">
                  <Link to="/checkout">
                    <button className=" p-2 bg-green rounded-lg text-white ">
                      {isEnglish ? "Checkout" : "Vérifier"}
                    </button>
                  </Link>
                  <Link to="/">
                    <button className="p-2 bg-green rounded-lg text-white ">
                      {isEnglish ? "Continue shopping" : "Continuer vos achats"}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;
