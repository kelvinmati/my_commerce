// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import { authToken } from "../redux/actions/ProductsActions";

// const Ip = () => {
//   const [ip, setIp] = useState("");
//   useEffect(() => {
//     getIp();
//   }, []);
//   const getIp = async () => {
//     try {
//       const response = await axios.get("https://api.ipify.org/?format=json");
//       const data = await response.data;
//       console.log(data.ip);
//       setIp(data.ip);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return ip;
// };

// export default Ip;
