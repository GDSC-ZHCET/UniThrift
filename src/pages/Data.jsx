import { useNavigate } from "react-router-dom";
function Data({ data }) {
    const naviagte = useNavigate();

    const handleShowProduct = () => {
        naviagte(`/product/${data.id}`)
    }

  return (
    <div 
        className="sm:w-[250px] w-full flex flex-col items-center justify-center border border-gray-300 rounded-md  shadow-xs p-5 m-[10px] cursor-pointer "
        onClick={handleShowProduct}
    >
      <img
        className="mb-2.5 w-full h-full sm:w-72 sm:h-48 object-cover"
        src={data.imageUrl}
        alt=""
      />
      <div className="flex flex-col items-start w-full font-medium text-sm">
        <p className="font-medium text-md">{data.title}</p>
        <p className="font-bold">₹{data.price}</p>
      </div>
    </div>
  );
}

export default Data;
