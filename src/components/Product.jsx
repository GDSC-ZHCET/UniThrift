import React, { useState ,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../utils/cartSlice";
import useFetchProducts from "../utils/useFetchProducts";
import { useParams } from "react-router-dom";

const Product = () => {

  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const {productId} = useParams();  

  const cartIds = useSelector((store) => store.cart.cartIds);
  const {products, loading, error} = useFetchProducts();
  // console.log(products);  
  // console.log(products);  
  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(item => item.id === productId);
      setProduct(foundProduct || null);
      console.log("Product found:", foundProduct);
    }
  }, [products, productId]);
  
  const handleAddToCart = (item) => {
    // if (!cartIds.includes(item)) {
    //   dispatch(addItems(item));
    // } else {
    //   alert("Already in cart");
    // }
    dispatch(addItems(item));
  };

   if (loading || products.length === 0) {
    return <div>Loading...</div>;
  }
   if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="flex items-center justify-center gap-10 w-full min-h-screen">
      <div className="">
        <img src={product.imageUrl} alt="Product" className="h-fit max-h-[80vh] w-[40vw] object-cover" />
      </div>
      <div className="flex flex-col  gap-5 w-[50vw]">
        <h1 className="w-full font-bold text-4xl">{product.title}</h1>
        <div className="text-sm text-slate-700">
          <p>
            {product.description}
          </p>
        </div>
        <div className="text-xl font-semibold w-full">
          <p>Rs.{product.price}</p>
        </div>
        <button onClick={() => handleAddToCart(100)} className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-5 rounded-full cursor-pointer">Add to Cart</button>
        <button className="border-2 border-blue-600 py-2 px-5 rounded-full cursor-pointer">Add to Wishlist</button>
      </div>
    </div>
  );
};

export default Product;
