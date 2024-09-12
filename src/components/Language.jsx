import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLanguage } from "../redux/actions/ProductsActions";
const Language = () => {
  const dispatch = useDispatch();
  const [isLanguagePopUpOpen, setIsLanguagePopUpOpen] = useState(false);
  let storedLang = localStorage.getItem("lang");
  useEffect(() => {
    if (storedLang) {
      setIsLanguagePopUpOpen(false);
    } else {
      setIsLanguagePopUpOpen(true);
    }
  }, [storedLang]);

  const handleLanguage = (e) => {
    let language = e.target.value;
    dispatch(getLanguage(language));
    setIsLanguagePopUpOpen(false);
  };
  return (
    <section className={isLanguagePopUpOpen ? "block" : "hidden"}>
      <div className="bg-[rgba(0,0,0,0.7)] z-50 bg-blend-multiply w-screen h-screen fixed top-0  ">
        <div className="w-[90%] sm:w-[50%] h-[250px] mx-auto  bg-white rounded p-3 fixed left-0 right-0 top-[25%] z-50">
          <div>
            <img
              src="https://res.cloudinary.com/lufumart-ecommerce/image/upload/q_auto/c_scale,w_187,h_29/v1649943020/lufumart-logo/Lufumart_Logo_owimai.png"
              alt=""
            />
          </div>

          <h2 className="text-lg ">Choose your preffered language</h2>
          <h2 className="text-lg ">Choisissez votre langue préférée</h2>
          <div onChange={handleLanguage}>
            <div className="space-x-2">
              <input type="radio" value="french" name="lang" id="" />
              <label htmlFor="">French</label>
            </div>
            <div className="space-x-2">
              <input type="radio" value="english" name="lang" id="" />
              <label htmlFor="">English</label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Language;
