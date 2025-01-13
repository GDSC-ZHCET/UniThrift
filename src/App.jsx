import './App.css'
import ProductsList from './components/ProductsList';

function App() {

  return (
    <>
      <div className='w-[100%] min-h-screen pt-[10vh] text-black flex flex-col'>
        <h1 className="font-bold text-3xl sm:px-6 lg:px-8 py-10">Explore Products</h1>
        <ProductsList />
      </div>
    </>
  )
}

export default App
