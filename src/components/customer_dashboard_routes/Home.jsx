import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../redux/actions/ProductsActions";
const Home = ({ currentUser }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  // get order history
  const orders = useSelector((state) => state?.Products?.orders);

  console.log(length);
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
    <div className="space-y-5">
      <div className="grid  grid-cols-2 sm:grid-cols-3 gap-5  w-full ">
        <div className="shadow rounded-lg flex flex-col justify-center bg-white items-center p-3">
          <p className="font-bold">Items in your cart</p>
          <p className="font-bold bg-orange text-white p-2 rounded-lg h-10 w-10  text-center mt-3 ">
            {currentUser?.cart?.length || 0}
          </p>
        </div>
        <div className="shadow rounded-lg flex flex-col justify-center bg-white items-center p-3">
          <p className="font-bold">Items in your wishlist</p>
          <p className="font-bold bg-orange text-white p-2 rounded-lg h-10 w-10  text-center mt-3 ">
            8
          </p>
        </div>
        <div className="shadow rounded-lg flex flex-col justify-center bg-white items-center p-3">
          <p className="font-bold">Total orders made</p>
          <p className="font-bold bg-orange text-white p-2 rounded-lg h-10 w-10  text-center mt-3 ">
            {orders?.length || 0}
          </p>
        </div>
      </div>
      <div className="space-y-3 bg-white p-2 rounded w-[350px] sm:w-full mx-auto">
        <h2 className="text-lg p-2 border-b-[1px] ">Purchase history</h2>
        <div className="w-full max-h-[500px] overflow-auto">
          <table className="w-full">
            {orders?.length > 0 ? (
              <Fragment>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>{isEnglish ? " Amount" : "Montant"}(USD)</th>
                    <th>{isEnglish ? "Status" : "Statut"}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order, index) => {
                    const { status, orderNumber, shipDate, total, _id } = order;
                    const rowIndex = index % 2 === 0;
                    return (
                      <tr
                        key={_id}
                        className={
                          rowIndex
                            ? "text-center bg-gray-50 rounded"
                            : "text-center bg-white"
                        }
                      >
                        <td className="py-3 px-1">{orderNumber}</td>
                        <td className="py-3 px-1">{shipDate}</td>
                        <td className="py-3 px-1">{total}</td>
                        <td className="py-3 px-1">
                          {" "}
                          <span
                            className={
                              status === "paid"
                                ? "bg-green text-white  p-2 rounded-lg"
                                : "bg-yellow-400  p-2 rounded-lg"
                            }
                          >
                            {status}
                          </span>{" "}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Fragment>
            ) : (
              <tbody className="text-center">
                <tr>
                  <td>No purchases made</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
