import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { calculateShipping, orderPayment } from "../redux/actions/OrderActions";
import { getUserCartItems } from "../redux/actions/ProductsActions";
// import MapComponent from "./MapComponent";
const Checkout = () => {
  const dispatch = useDispatch();
  // set button loading
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const orderedItems = useSelector(
    (state) => state?.Products?.cart?.cartDetail?.[0]?.items
  );

  const subTotal = useSelector(
    (state) => state?.Products?.cart?.cartProductTotal
  );
  // const subTotal = useSelector(
  //   (state) => state?.Products?.cart?.cartDetail?.[0]
  // );
  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      dispatch(getUserCartItems());
    }
    return () => (subscribed = false);
  }, []);

  const total = orderedItems?.length;
  // get the shipping cost
  useEffect(() => {
    dispatch(calculateShipping());
  }, []);
  const shippingFee = useSelector((state) => state?.Order?.shipping);

  // calculate total amount
  const totalAmount = subTotal?.total + shippingFee;
  // get order errors from the state
  const error = useSelector((state) => state?.error);

  console.log("order error", error);
  useEffect(() => {
    if (error.typeId === "MAKE_ORDER_FAIL") {
      setIsButtonLoading(false);
    } else {
      setIsButtonLoading(false);
    }
  }, [error]);
  // open google maps
  const [open, setOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phone, setPhone] = useState("");
  // console.log("Actual address iss", deliveryAddress);

  // get payment values
  const handlePayment = (e) => {
    let value = e.target.value;
    setPaymentMethod(value);
  };
  // get phone number
  const handlePhoneNo = (e) => {
    let phone = e.target.value;
    setPhone(phone);
  };
  // get values from the state and male payment
  const data = {
    deliveryAddress,
    paymentMethod,
    phone,
  };
  const handlePay = () => {
    setIsButtonLoading(true);
    dispatch(orderPayment(data));
    // alert("paid");
    console.log("data is", data);
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
    <section className="py-14 bg-uniform_grey">
      <div className="w-mobile md:w-container_width  grid md:grid-cols-5 gap-4 mx-auto">
        <div className="space-y-5 md:md:col-span-3">
          <div>
            <h2 className="text-lg my-2">
              {isEnglish ? "Delivery Address " : "Adresse de livraison"}{" "}
              <span className="text-red">*</span>
            </h2>
            <div
              onClick={() => setOpen(true)}
              className="cursor-pointer  flex justify-between items-center rounded-lg bg-white p-2 space-x-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-11 w-11 p-1.5 bg-orange text-white rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="flex-auto">
                {/* {deliveryAddress || isEnglish
                  ? "Click to search delivery location"
                  : "Cliquez pour rechercher le lieu de livraison"} */}
                {deliveryAddress === ""
                  ? isEnglish
                    ? "Click to search delivery location"
                    : "Cliquez pour rechercher le lieu de livraison"
                  : deliveryAddress}
              </p>
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
          <div>
            <h2 className="text-lg my-2">
              {isEnglish ? "Payment Method" : "Mode de paiement"}
              <span className="text-red"> *</span>
            </h2>
            <div className="flex flex-col space-y-4" onChange={handlePayment}>
              <label className=" bg-white p-2 flex space-x-3 rounded-lg cursor-pointer">
                <input type="radio" name="payment" value="3" />
                <p>Orange</p>
              </label>
              <label className=" bg-white p-2 flex space-x-3 rounded-lg cursor-pointer">
                <input type="radio" name="payment" value="2" />
                <p>Mpesa</p>
              </label>
              <label className=" bg-white p-2 flex space-x-3 rounded-lg cursor-pointer">
                <input type="radio" name="payment" value="1" />
                <p>Airtel</p>
              </label>
              <label className=" bg-white p-2 flex space-x-3 rounded-lg cursor-pointer">
                <input type="radio" name="payment" value="0" />
                <p>Maxicash</p>
              </label>
            </div>
          </div>
          <div>
            <h2 className="text-lg mb-2">
              {isEnglish
                ? "Enter payment mobile number"
                : "Entrez le numéro de mobile de paiement"}
              <span className="text-red"> *</span>
            </h2>
            <input
              type="text"
              className="p-2 rounded w-full"
              placeholder={
                isEnglish
                  ? "Enter mobile number"
                  : "Entrez le numéro de téléphone portable"
              }
              value={phone}
              onChange={handlePhoneNo}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-lg my-2">
            {isEnglish ? "My Order" : "ma commande"}({total})
          </h2>

          <div className="grid grid-cols-2 gap-2">
            {orderedItems?.map((orderedItem) => {
              const { name, price, quantity, imageUrl, _id } = orderedItem;
              return (
                <div key={_id} className="bg-white p-2 rounded">
                  <div className="h-[100px] w-full flex justify-center">
                    <img src={imageUrl[0]} alt={name} />
                  </div>
                  <p className="my-2">{name}</p>
                  <div className="flex justify-between">
                    <p>
                      Qty: <span>{quantity}</span>{" "}
                    </p>
                    <p className="text-green"> $ {price}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center mt-4  ">
              <h2>{isEnglish ? "Sub Total" : "Sous-total"}</h2>
              <h2>USD ${subTotal?.total}</h2>
            </div>
            <div className="flex justify-between items-center mt-4  ">
              <h2>{isEnglish ? "Shipping fee" : "Frais d'expédition"}</h2>
              <h2>USD ${shippingFee}</h2>
            </div>
            <div className="flex justify-between items-center mt-4 font-bold ">
              <h2>{isEnglish ? "Total Amount" : "Montant total"}</h2>
              <h2>USD ${totalAmount}</h2>
            </div>
            <div>
              <button
                onClick={handlePay}
                className="p-2  bg-green text-white w-full rounded-lg "
              >
                {isButtonLoading ? (
                  <div className="flex justify-center items-center space-x-2 opacity-90 disabled">
                    <span className="w-7 h-7 border-[2px]  border-r-gray-700 rounded-full animate-spin"></span>
                    <span>
                      {isEnglish ? "PLEASE WAIT" : "S'IL VOUS PLAÎT, ATTENDEZ"}
                    </span>
                  </div>
                ) : (
                  // <span>PAY NOW</span>
                  <span>{isEnglish ? "PAY NOW" : "PAYEZ MAINTENANT"}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {open ? (
        <MapComponent
          setOpen={setOpen}
          setDeliveryAddress={setDeliveryAddress}
        />
      ) : null} */}
    </section>
  );
};

export default Checkout;
// const loop = [1, 2];
