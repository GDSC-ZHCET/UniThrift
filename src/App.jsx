import Navbar from './navbar'
import Cart from './cart'
import Summary from './summary'

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
