import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Subscribe = () => {
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
    <section className="w-full h-auto py-7 bg-uniform_grey">
      <div className="w-mobile md:w-container_width  h-full mx-auto  grid md:grid-cols-3  gap-4 ">
        <div className=" w-full  h-full bg-white shadow flex flex-col justify-center items-center p-5 space-y-3 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-orange"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <a href="#">
            <p>{isEnglish ? "Term & Conditions" : "Termes et conditions"}</p>
          </a>
        </div>
        <div className=" w-full  h-full bg-white shadow flex flex-col justify-center items-center py-3 rounded ">
          <h2 className=" ">
            {isEnglish ? "Get lufumart" : "Obtenez Lufumart"}
            <span className="before:block mx-2 before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange relative inline-block">
              <span className="relative text-white p-2">App</span>
            </span>
            on
          </h2>
          <div className="flex items-center ">
            <a href="#" className="">
              <img
                src="https://res.cloudinary.com/kelvin45/image/upload/q_auto/c_scale,w_164,h_75/v1650031522/logos/images_op1p7a.jpg"
                alt=""
                className=""
              />
            </a>
            <a href="#" className="">
              <img
                src="https://res.cloudinary.com/kelvin45/image/upload/q_auto/c_scale,w_151,h_85/v1650031515/logos/appstore_stztwh.png"
                alt=""
                className=""
              />
            </a>
          </div>
        </div>
        <div className="  w-full p-3  h-full bg-white shadow rounded">
          {/* <p className="pb-5">
            Subcribe to our newsletter to get{" "}
            <span className="text-orange px-1">updated</span> on{" "}
            <span className="text-orange">New </span> new and
            <span className="text-orange"> amazing !! </span> deals
          </p> */}
          <p className="pb-5">
            {isEnglish
              ? "Subscribe to get updated on new deals"
              : "Abonnez-vous pour être informé des nouvelles offres"}
          </p>
          <form className="flex space-x-2 ">
            <input
              type="email"
              placeholder={
                isEnglish ? "Enter your email" : "Entrer votre Email"
              }
              className="border  focus:outline-0 p-2  w-full"
            />
            <input
              type="submit"
              value={isEnglish ? "Subscribe" : "S'ABONNER"}
              className="bg-orange uppercase text-white  p-2"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
