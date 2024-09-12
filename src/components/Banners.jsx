import React from "react";

const Banners = () => {
  const banners = [1, 2, 3];
  return (
    <section className="bg-uniform_grey py-9  hidden sm:block">
      <div className="w-container_width mx-auto ">
        {/* <marquee behavior="" direction=""> */}
        <div className="   grid grid-cols-2 md:grid-cols-3 gap-3">
          {banners.map((banner, index) => {
            return (
              <div key={index} className=" w-full h-36 flex">
                <img
                  src="https://demo.activeitzone.com/ecommerce/public/uploads/all/HordtzBXzs1JUTTFpRyGLPYO26Z9J4IVt3jLeOsM.png"
                  alt=""
                  className="rounded"
                />
              </div>
            );
          })}
        </div>
        {/* </marquee> */}
      </div>
    </section>
  );
};

export default Banners;
