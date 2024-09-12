import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../redux/actions/AuthActions";
const Settings = ({ setIsLanguagePopUpOpen }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(
    (state) => state?.auth?.customer?.current_user
  );
  const updateError = useSelector((state) => state?.error);
  console.log("updatEerror is", updateError);
  const [userValues, setUserValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState(false);
  const { name, email, phone } = userValues;

  useEffect(() => {
    if (updateError.typeId === "UPDATE_CUSTOMER_PROFILE") {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [updateError]);
  useEffect(() => {
    if (currentUser) {
      setUserValues({
        name: currentUser?.name,
        email: currentUser?.email,
        phone: currentUser?.phone,
      });
    }
  }, [currentUser]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserValues({ ...userValues, [name]: value });
  };

  // handleUpdate
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !phone) {
      setLoading(false);
      setError(true);
    } else {
      setError(false);

      dispatch(updateCustomer(userValues));
    }
  };
  // handle popup
  const handlePopUp = () => {
    setIsLanguagePopUpOpen(true);
  };

  return (
    <section>
      <div>
        <div className="flex justify-between items-center sm:my-2 my-4">
          <h2 className="font-bold "> Account</h2>
          <button
            onClick={handlePopUp}
            className="p-2 bg-orange rounded-full text-white"
          >
            Language
          </button>
        </div>
        <p>You can edit your personal details here.</p>
        {error && <p className="text-red">All fields are required</p>}
        <form onSubmit={handleUpdate} className="space-y-5 pt-5">
          <div>
            <div className="flex flex-col">
              <label>Name</label>
              <input
                className="p-2 rounded focus:outline-dashed"
                type="text"
                onChange={handleOnChange}
                defaultValue={currentUser?.name}
                name="name"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <label>Email</label>
              <input
                className="p-2 rounded focus:outline-dashed"
                type="email"
                onChange={handleOnChange}
                defaultValue={currentUser?.email}
                name="email"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <label>Phone number</label>
              <input
                className="p-2 rounded focus:outline-dashed"
                type="number"
                onChange={handleOnChange}
                defaultValue={currentUser?.phone}
                name="phone"
              />
            </div>
          </div>
          <div className="w-full ">
            <button
              type="submit"
              className="p-2 flex justify-center items-center space-x-2 w-full rounded text-white bg-green  "
            >
              <div
                className={
                  loading
                    ? "w-7 h-7 border-2 border-r-gray-500 animate-spin border-gray-800 rounded-full"
                    : "hidden"
                }
              ></div>
              <div>Update</div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Settings;
