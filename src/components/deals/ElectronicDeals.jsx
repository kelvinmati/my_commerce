import React from "react";

const ElectronicDeals = () => {
    return (
        <section className="bg-uniform_grey py-10">
            <div className="w-container_width mx-auto">
                {/* <p className="bg-orange p-2 mb-5 text-white rounded">
                    Electronic deals
                </p> */}
                <p className="text-2xl text-center pb-7 ">ELECTRONIC DEALS</p>
                <div className="grid  grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-green  hover:shadow-lg">
                        <div>
                            <img
                                src="https://ke.jumia.is/cms/2022/W16/HP/Default/Deals/_DB5.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="hover:shadow-lg">
                        <div>
                            <img
                                src="https://ke.jumia.is/cms/2022/W16/HP/Default/Deals/_DB5.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ElectronicDeals;
