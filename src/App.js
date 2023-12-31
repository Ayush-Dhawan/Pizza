import logo from './logo.svg';
import './App.css';
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import MenuPage, {loader as menuLoader} from './features/menu/MenuPage';
import Cart from './features/cart/Cart';
import CreateOrder, {action as createOrderAction} from './features/order/CreateOrder';
import Order, {loader as orderLoader} from './features/order/Order';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error'
import {action as UpdateOrderAction} from './features/order/UpdateOrder'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/menu',
        element: <MenuPage />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: UpdateOrderAction,
      },
      {
        basename: '/Pizza', // Replace with your actual subdirectory
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
