import { formatCurrency } from "../../utils/helper";
import Button from '../../ui/Button';
import {  useDispatch, useSelector } from 'react-redux'
import { addItem, getQuantityById } from '../cart/CartSlice'
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantity from "../cart/UpdateQuantity";



  function MenuItem({ pizza }) {
      const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
      // let quantity = 1
      const currentQuantity = useSelector(getQuantityById(id))
      const isInCart = currentQuantity > 0;
      const dispatch = useDispatch();

      function handleAddToCart() {
        const newItem = {
          pizzaId: id,
          name,
          quantity: 1,
          unitPrice,
          totalPrice: unitPrice * 1,
        };
        dispatch(addItem(newItem));
      }
    

    return (
      <li className="flex gap-4 py-2">
        <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`} />
        <div className="flex flex-col flex-grow">
          <p className="font-medium">{name}</p>
          <p className="text-sm italic capitalize">{ingredients.join(', ')}</p>
          <div className="mt-auto flex justify-between items-center ">
            {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm text-stone-400 uppercase font-medium">Sold out</p>}
           {isInCart && <div className="flex items-center gap-2 sm:gap-4"> <UpdateQuantity pizzaId={id} quantity={currentQuantity} /> <DeleteItem pizzaId={id}/></div>}
        {!soldOut && !isInCart  && <Button type="small" onClick={handleAddToCart}>Add to cart</Button> }
          </div>
        </div>
      </li>
    );
  }
  
  export default MenuItem;