import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import {useSelector} from 'react-redux'
import { getQuantityById, getTotalItems } from './CartSlice';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalunitPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalunitPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalunitPrice: 15,
//   },
// ];

function Cart() {
  const cart = useSelector(state => state.cart.cart)
  const username = useSelector(state => state.user.username)
  const noPizzas = useSelector(getTotalItems)

 
  return (
    <div className='py-3 px-4'>
      <Button type='small' to="/menu">&larr; Back to menu</Button>

      {noPizzas && <h2 className='mt-7 text-xl font-semibold text-stone-500'>Your cart, {username}</h2>}
       <ul className='divide-y divide-orange-400 text-slate-500 border-b'>
        <li>{cart.map((item) => <CartItem item={item} key={item.pizzaId} />)}</li>
       </ul>

      {noPizzas ? <div className='mt-6 space-x-4'>
        <Button type="primary" to="/order/new">Order pizzas</Button>
        <Button type="secondary">Clear cart</Button>
      </div> : <p className='text-xl font-bold h-full w-full flex items-center justify-center'>Hey {username}, your cart is empty</p>}
    </div>
  );
}

export default Cart;