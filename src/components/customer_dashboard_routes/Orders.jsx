// import * as React from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";

// const columns = [
//   { id: "ID", label: "ID", minWidth: 70 },
//   { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
//   {
//     id: "population",
//     label: "Population",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "size",
//     label: "Size\u00a0(km\u00b2)",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "density",
//     label: "Density",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toFixed(2),
//   },
// ];

// function createData(ID, code, population, size) {
//   const density = population / size;
//   return { ID, code, population, size, density };
// }

// const rows = [
//   createData("1", "IN", 1324171354, 3287263),
//   createData("2", "CN", 1403500365, 9596961),
//   createData("3", "IT", 60483973, 301340),
//   createData("4", "US", 327167434, 9833520),
//   createData("5", "CA", 37602103, 9984670),
//   createData("6", "AU", 25475400, 7692024),
//   createData("7", "DE", 83019200, 357578),
//   createData("8", "IE", 4857000, 70273),
//   createData("9", "MX", 126577691, 1972550),
//   createData("10", "JP", 126317000, 377973),
//   createData("11", "FR", 67022000, 640679),
//   createData("12", "GB", 67545757, 242495),
//   createData("13", "RU", 146793744, 17098246),
//   createData("14", "NG", 200962417, 923768),
//   createData("15", "BR", 210147125, 8515767),
// ];

// export default function Orders() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: "100%", overflow: "hidden" }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow className="bg-orange">
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === "number"
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }

import React, { useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import ClosedOrders from "./order routes/ClosedOrders";
import OpenOrders from "./order routes/OpenOrders";
// import OrderDetails from "./order routes/OrderDetails";

const Orders = () => {
  let location = useLocation();

  return (
    <section>
      <div className="flex justify-evenly   bg-white rounded-full">
        <Link
          to="/dashboard/customer/orders"
          className={
            location?.pathname === "/dashboard/customer/orders"
              ? "text-lg cursor-pointer w-full bg-orange text-white rounded-full  p-2"
              : "text-lg cursor-pointer w-full bg-white text-black rounded-full  p-2"
          }
        >
          <h2>Open Orders</h2>
        </Link>
        <Link
          to="closed_orders"
          className={
            location?.pathname === "/dashboard/customer/orders/closed_orders"
              ? "text-lg text-white bg-orange cursor-pointer w-full rounded-full  p-2"
              : "text-lg cursor-pointer w-full rounded-full  p-2"
          }
        >
          <h2>Closed Orders</h2>
        </Link>
      </div>
      <div className="pt-6 bg-">
        <Routes>
          <Route path="/" element={<OpenOrders />} />
          <Route path="/closed_orders" element={<ClosedOrders />} />
          {/* <Route path="/:id" element={<OrderDetails />} /> */}
        </Routes>
      </div>
    </section>
  );
};

export default Orders;
