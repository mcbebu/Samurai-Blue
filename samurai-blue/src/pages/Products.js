import React from "react";
import { useState, useEffect } from "react";
import { BACKEND_DOMAIN } from "../util/api";
import "./page-styles.css";



function Products() {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllInformation = async () => {
      // start loading
      setIsLoading(true);
      // make the request here
      const data = await fetch(BACKEND_DOMAIN + "products");
      const body = await data.json();
      setState(body);
      // already finished here
      setIsLoading(false);
    };
    getAllInformation();
  }, []);
  const content = [];
  for (let i = 0; i < state.length; i++) {
    content.push(state[i]);
  }
  console.log(content);
  return (
    
    <div>
      {isLoading ? (
        ""
      ) : (
        <div className="flex flex-col flex-1 w-full h-full font-opensans py-16 px-12 gap-5 colored-bg">
          <div className="flex justify-between align-middle relative">
            <div className="page-heading w-full pb-3 border-b-2">Products</div>
        
          </div>
          <ul className="list-table font-semibold gap-10 mx-7 justify-items-start">
            <li>Product ID</li>
            <li>Product Name</li>
            <li>Product Code</li>
            <li>Quantity</li>
            <li>Price</li>
          </ul>
          {content.map((product) => {
            return (
              <div className="list-table w-full flex flex-col gap-10 p-7 bg-white relative rounded-lg">
                <div className="font-semibold">{product.id}</div>
                <div className="">{product.name}</div>
                <div className="">{product.product_code}</div>
                <div className="">{product.quantity}</div>
                <div className="">{product.price / 100}</div>
              </div>
            );
          })}

        </div>)}
    </div>
  )
}
export default Products;

//       {isLoading ? (
//         ""
//       ) : (
//         <div className="flex flex-col w-full h-full font-opensans py-16 px-12 gap-5 bg-gray-100">
//           <div className="flex justify-between align-middle">
//             <div className="page-heading w-full pb-3 border-b-2">Products</div>
//           </div>
//           <ul className="list-table font-semibold gap-10 mx-7 justify-items-start">
//             <li>Product ID</li>
//             <li>Product Name</li>
//             <li>Product Code</li>
//             <li>Quantity</li>
//             <li>Price</li>
//           </ul>
//           {content.map((product) => {
//             return (
//               <div>

// <div>
//                 <div className="list-table w-full gap-10 p-7 bg-white relative rounded-lg">
//                   <div className="tab-id font-semibold">{product.id}</div>
//                   {/* <div className="tab-name">{product.imageurl}</div> */}
//                   <div className="tab-name">{product.name}</div>
//                   <div className="tab-name">{product.product_code}</div>
//                     <div className="tab-name">{product.quantity}</div>
//                     <div className="tab-name">{product.price / 100}</div>
//                     {/* <div className="product-img-container w-[7rem] h-[7rem] bg-black rounded-md shadow-xl">
//                     <img
//                       src={product.imageurl}
//                       className="object-cover w-full h-full"
//                     ></img>
//                   </div> */}

//                 </div>
//               </div>
//                 </div>
//             );
//           })}

//           <button className="dark-btn-norm absolute bottom-8 right-20">
//             Add Product
//           </button>
//         </div>
//       )}


