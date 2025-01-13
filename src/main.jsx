import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Product from './pages/Product.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Navbar from './components/Navbar.jsx';


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "/product/:productId",
        element: <Product />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path:"/signup",
        element: <Signup />
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <RouterProvider router={appRouter}/>
);