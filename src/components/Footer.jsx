import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
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
    <section className="py-20 ">
      <div className=" flex flex-col  space-y-6 text-center  items-center w-mobile md:w-container_width mx-auto">
        <div className="">
          <img
            src="https://res.cloudinary.com/lufumart-ecommerce/image/upload/q_auto/c_scale,w_214,h_33/v1649943020/lufumart-logo/Lufumart_Logo_owimai.png"
            alt=""
          />
        </div>
        <ul className="flex md:flex-row flex-col md:space-x-10 space-x-0 space-y-2 md:space-y-0">
          <Link className="hover:text-orange" to="/">
            <li>{isEnglish ? "Home" : "Maison"}</li>
          </Link>
          <Link className="hover:text-orange" to="/">
            <li>{isEnglish ? "Sell" : "Vendre"}</li>
          </Link>

          <Link className="hover:text-orange" to="/">
            <li>
              {isEnglish
                ? "Advertise with us"
                : "faites de la publicité avec nous"}
            </li>
          </Link>
          <Link className="hover:text-orange" to="/">
            <li>
              {isEnglish ? "Privacy policy" : "politique de confidentialité"}
            </li>
          </Link>
        </ul>
        <div className="flex space-x-4 text-orange ">
          <ion-icon name="logo-facebook"></ion-icon>
          <ion-icon name="logo-twitter"></ion-icon>
          <ion-icon name="logo-linkedin"></ion-icon>
        </div>
        <div>
          <p className="text-sm">
            {isEnglish ? "Copyright" : "droits d'auteur"} &copy;{" "}
            {new Date().getFullYear()} Lufumart.
            {isEnglish
              ? "All rights reserved"
              : "Tous les droits sont réservés"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
