import { useNavigate } from "react-router-dom";
function Data({ data }) {
    const naviagte = useNavigate();

    const handleShowProduct = () => {
        naviagte(`product/${data.id}`)
    }

  return (
    <div 
        className="w-[250px] flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-md p-5 m-[10px] cursor-pointer hover:scale-105 transition-all duration-600"
        onClick={handleShowProduct}
    >
      <img
        className="mb-2.5 w-72 h-48 object-cover"
        src={data.imageUrl}
        alt=""
      />
      <p className="font-bold text-xl">{data.title}</p>
      <div className="font-medium text-lg">
        <p>₹{data.price}</p>
      </div>
    </div>
  );
}

export default Data;
