import React, { useEffect } from "react";
import scale from "../assets/scale.webp";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../utils/cartSlice";
import useFetchProducts from "../utils/useFetchProducts";

const Product = () => {
  const dispatch = useDispatch();

  const cartIds = useSelector((store) => store.cart.cartIds);
  const {products, loading, error} = useFetchProducts();
  useEffect(() => {
    console.log(products);
  }, [products]);
  
  const handleAddToCart = (item) => {
    // if (!cartIds.includes(item)) {
    //   dispatch(addItems(item));
    // } else {
    //   alert("Already in cart");
    // }
    dispatch(addItems(item));
  };

  return (
    <div className="flex items-center justify-center gap-10 w-full min-h-screen">
      <div className="">
        <img src={scale} alt="Product" className="h-fit w-[40vw]" />
      </div>
      <div className="flex flex-col  gap-5 w-[50vw]">
        <h1 className="w-full font-bold text-4xl">15 cm Steel Scale</h1>
        <div className="text-sm text-slate-700">
          <p>
            Some basic description stuff about the product, its time of usage
            and condition Some basic description stuff about the product, its
            time of usage and condition Some basic description stuff about the
            product, its time of usage and condition
          </p>
        </div>
        <div className="text-xl font-semibold w-full">
          <p>Rs.20</p>
        </div>
        <button onClick={() => handleAddToCart(100)} className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-5 rounded-full cursor-pointer">Add to Cart</button>
        <button className="border-2 border-blue-600 py-2 px-5 rounded-full cursor-pointer">Add to Wishlist</button>
      </div>
    </div>
  );
};

export default Product;
