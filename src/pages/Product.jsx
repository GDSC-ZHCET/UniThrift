import { useParams } from 'react-router-dom';
import Data from './data';
import '../pages/Product.css'
import useFetchProducts from '../utils/useFetchProducts';

const Product = () => {
  const { productId } = useParams();
  const {products, loading, error} = useFetchProducts();

  return (
    <div className='product-style'>
      <h1 className='head'>Product {productId}</h1>
      <hr/>
      <div className="product-item">
        {products.map((data,i)=>{
          return<Data key={i} id={data.id} name={data.name} image={data.image} price={data.price}/>
        })}
      </div>
    </div>
  );
}

export default Product;