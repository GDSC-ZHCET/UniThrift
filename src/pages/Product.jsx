import { useParams } from 'react-router-dom';
import Data from './data';
import DataProducts from './DataProduct';
import '../pages/Product.css'

const Product = () => {
  const { productId } = useParams();

  return (
    <div className='product-style'>
      <h1 className='head'>Product {productId}</h1>
      <hr/>
      <div className="product-item">
        {DataProducts.map((data,i)=>{
          return<Data key={i} id={data.id} name={data.name} image={data.image} price={data.price}/>
        })}
      </div>
    </div>
  );
}

export default Product;