import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../redux/actions/ProductsActions";
const NetworkError = () => {
  const dispatch = useDispatch();
  // network error
  const [isNetworkModalOpen, setisNetworkModalOpen] = useState(false);
  const error = useSelector((state) => state?.error);
  // console.log("error is", error);

  useEffect(() => {
    if (error.typeId === "NETWORK_ERROR") {
      setisNetworkModalOpen(true);
    } else {
      setisNetworkModalOpen(false);
    }
  }, [error]);
  return (
    <section
      className={
        isNetworkModalOpen
          ? "flex  flex-col justify-center items-center bg-[rgba(0,0,0,0.7)] text-white h-screen fixed w-full z-50 bg-blend-multiply"
          : "hidden"
      }
    >
      <h2 className="bg-orange p-2 rounded-lg">SORRY YOU DONT HAVE INTERNET</h2>
      <Link to="/">
        <button
          onClick={() => dispatch(getProducts())}
          className="bg-green text-white p-2"
        >
          retry
        </button>
      </Link>
    </section>
  );
};

export default NetworkError;
