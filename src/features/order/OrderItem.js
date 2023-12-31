import { formatCurrency } from "../../utils/helper";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
    const { quantity, name, totalPrice } = item;
  
    return (
      <li className="space-y-1 space-x-1">
        <div className="flex items-center justify-between gap-4 text-sm font-semibold">
          <p>
            <span className="font-bold">{quantity}&times;</span> {name}
          </p>
          <p className="font-bold">{formatCurrency(totalPrice)}</p>
        </div>
        <p className="text-sm text-orange-400 capitalize italic space-x-1">{isLoadingIngredients ? "Loading ingredients..." : ingredients.join(', ')}</p>
      </li>
    );
  }
  
  export default OrderItem;