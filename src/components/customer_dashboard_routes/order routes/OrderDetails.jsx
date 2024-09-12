import React from "react";

const OrderDetails = ({ items }) => {
  //   console.log(typeof items);
  //   console.log(items);

  return (
    <div className="py-7">
      <div className="grid sm:grid-cols-2 gap-3">
        {items?.map((itm) => {
          const { name, imageUrl, price, _id, quantity } = itm;
          return (
            <div
              key={_id}
              className=" bg-white p-4 shadow rounded flex space-x-5  items-center"
            >
              <div className="h-32  flex justify-center">
                <img src={imageUrl[0]} alt={name} />
              </div>
              <div>
                <h2>{name}</h2>
                <p>
                  {" "}
                  <span className="font-bold">Quantity</span> : {quantity}
                </p>
                <p>
                  {" "}
                  <span className="font-bold"> price</span> :$ {price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderDetails;
