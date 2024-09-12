import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getOrders } from "../../../redux/actions/ProductsActions";
import OrderDetails from "./OrderDetails";
const OpenOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOrderDetailOpen, setisOrderDetailOpen] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      fetchOrders();
    }
    return () => (subscribed = false);
  }, []);

  const fetchOrders = useCallback(() => {
    dispatch(getOrders());
  }, []);

  const handleShowOrder = (items) => {
    setisOrderDetailOpen(false);
    setProducts(items);
  };
  const openOrders = useSelector((state) => state?.Products?.orders);
  // console.log("openOrders are", openOrders);
  // console.log("isOrderDetailOpen", isOrderDetailOpen);

  return (
    <>
      {isOrderDetailOpen ? (
        <div className="grid sm:grid-cols-2 gap-3 sm:h-[500px]  sm:overflow-y-auto pb-5 pr-3">
          {openOrders?.map((openOrder) => {
            const {
              _id,
              shippingFee,
              status,
              orderNumber,
              paymentMethod,
              amountPaid,
              items,
            } = openOrder;
            return (
              <div
                key={_id}
                className="flex  space-x-5 bg-white shadow p-3 rounded-lg "
              >
                <div className="h-36  flex items-center">
                  <img src={items[0]?.imageUrl[0]} alt="" className="h-full " />
                </div>
                <div className="flex-auto">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">{orderNumber}</p>
                    <p
                      onClick={() => handleShowOrder(items)}
                      className="  text-green px-[7px] py-[3px] rounded-lg hover:bg-green hover:text-white cursor-pointer transition"
                    >
                      view
                    </p>
                  </div>
                  <p>Order price: $ {amountPaid}</p>
                  <p>Shipping fee: $ {shippingFee}</p>
                  <p>
                    Status:<span className="text-orange">{status}</span>
                  </p>
                  <p>Payment: {paymentMethod}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setisOrderDetailOpen(true)}
            className="bg-gray-200 p-2 rounded  flex"
          >
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
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
            Back
          </button>
          <OrderDetails items={products} />
        </div>
      )}
    </>
  );
};

export default OpenOrders;
