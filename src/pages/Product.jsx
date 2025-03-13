import Data from './Data';
import '../pages/Product.css'
import useFetchProducts from '../utils/useFetchProducts';

const Products = () => {
  
  const {products, loading, error} = useFetchProducts();

  return (
    <div className='product-style'>
      <div className="product-item flex">
        {products.map((data,i)=>{
          return<Data key={i} data={data}/>
        })}
      </div>
    </div>
  );
}

export default Products;