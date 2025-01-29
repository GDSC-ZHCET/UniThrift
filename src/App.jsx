import Navbar from './components/navbar'
import Cart from './pages/cart'
import Summary from './components/summary'

function App() {
  return (
    <div className='App'>
      <Navbar/>
      <div className="content">
        <Cart/>
        <Summary/>
      </div>
    </div>
  )
}

export default App
