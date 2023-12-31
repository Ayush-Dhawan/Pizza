import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import cartReducer, { getTotalItems, getTotalCartPrice } from './CartSlice'
import { formatCurrency } from "../../utils/helper";

function CartOverview() {
  const noPizzas = useSelector(getTotalItems);
  const totalCost = useSelector(getTotalCartPrice)

  if(!noPizzas) return null;
    return (
      <div className="bg-stone-800 flex items-center justify-between text-stone-200 uppercase px-4 py-4 sm:px-6 text-sm md:text-base ">
        <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
          <span>{noPizzas} pizzas</span>
          <span>{formatCurrency(totalCost)}</span>
        </p>
        <Link to='/cart'>Open cart &rarr;</Link>
      </div>
    );
  }
  
  export default CartOverview;