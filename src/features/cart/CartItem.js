import Button from '../../ui/Button';
import {formatCurrency} from '../../utils/helper'
import { useSelector} from 'react-redux'
import DeleteItem from './DeleteItem';
import UpdateQuantity from './UpdateQuantity';
import { getQuantityById } from './CartSlice';


function CartItem({ item }) {
    const { pizzaId, name, quantity, totalPrice } = item;
    const eachQuantity = useSelector(getQuantityById(pizzaId))

    return (
      <li className='py-3 flex justify-between align-top'>
        <p>
          {quantity}&times; {name}
        </p>
        <div className='flex items-center justify-between'>
          <p className='text-sm font-bold '>{formatCurrency(totalPrice)}</p>

          <UpdateQuantity pizzaId={pizzaId} quantity={eachQuantity} />
          <DeleteItem pizzaId={pizzaId} />

        </div>
      </li>
    );
  }
  
  export default CartItem;