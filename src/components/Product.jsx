import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../utils/cartSlice";
import useFetchProducts from "../utils/useFetchProducts";
import { useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast"; // Import toast

const Product = () => {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { productId } = useParams();  

  const cartIds = useSelector((store) => store.cart.cartIds);
  const { products, loading, error } = useFetchProducts();
  
  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(item => item.id === productId);
      setProduct(foundProduct || null);
    }
  }, [products, productId]);
  
  const handleAddToCart = () => {
    dispatch(addItems(product));
    
    // Show toast notification
    toast.success(`${product.title} added to cart!`, {
      duration: 3000,
      position: "bottom-right",
      style: {
        background: '#333',
        color: '#fff',
      },
      icon: '🛒',
    });
  };

  if (loading || products.length === 0) {
    return <div>Loading...</div>;
  }
  
  if (!product) {
    return <div>Product not found</div>;
  }
  
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 pt-10 w-full min-h-screen px-4">
      {/* Toast container */}
      <Toaster />
      
      <div className="w-full md:w-[40vw]">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="h-fit max-h-[80vh] w-fit rounded-md object-cover" 
        />
      </div>
      
      <div className="flex flex-col justify-start gap-5 w-full md:w-[40vw]">
        <h1 className="w-full font-bold text-4xl">{product.title}</h1>
        <div className="text-[20px] font-medium w-full">
          <p>₹{product.price}</p>
        </div>
        
        <button 
          onClick={handleAddToCart} 
          className="bg-[#111828] hover:bg-[#1f2937] text-white py-3 px-5 rounded-md cursor-pointer transition duration-200 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Add to Cart
        </button>
        
        <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-5 rounded-md cursor-pointer transition duration-200">
          Add to Wishlist
        </button>
        
        <div className="flex items-baseline ">
          <span className="font-semibold text-black text-[1rem]">Posted By:</span>
          <span className="ml-5 font-medium text-[1rem]">
            {product.seller}
          </span>
        </div>
        <div className="text-sm text-slate-700">
          <span className="font-semibold text-black text-[1rem]">Description</span>
          <p className="mt-5">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;