// Test ID: IIDSAT

import { getOrder } from "../../services/apiRestaurant";
import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
  } from "../../utils/helper";
import {useLoaderData, useFetcher} from 'react-router-dom'
// import {useSelector, useDispatch} from 'react-redux'
import OrderItem from './OrderItem'
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";



  
  function Order() {
    // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

    const order = useLoaderData();
    const fetcher = useFetcher();
    // const address = useSelector(state => state.user.address)
    // console.log(address)

    useEffect(() =>{
      if(!fetcher.data && fetcher.state === 'idle')fetcher.load('/menu')
    }, [fetcher])
    const {
      id,
      status,
      priority,
      priorityPrice,
      orderPrice,
      estimatedDelivery,
      cart,
    } = order;
    const deliveryIn = calcMinutesLeft(estimatedDelivery);
  
    return (
      <div className="px-4 py-6 space-y-8 ">
        <div className="flex items-center justify-between flex-wrap">
          <h2 className=" text-xl font-semibold "> Order#{id} Status</h2>
  
          <div className="spacing-x-2">
            {priority && <span className="bg-red-300 text-red-500 tracking-wide rounded-full px-4 py-2 text-sm uppercase font-semibold">Priority</span>}
            <span className="bg-green-300 text-green-500 tracking-wide rounded-full px-4 py-2 text-sm uppercase font-semibold">{status} order</span>
          </div>
        </div>
  
        <div className="flex items-center justify-between flex-wrap bg-stone-200 px-4 py-2">
          <p>
            {deliveryIn >= 0
              ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
              : "Order should have arrived"}
          </p>
          <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
        </div>

        <ul className="divide-stone-300 divide-y border-b border-t border-stone-300">
          {cart.map(item => <li><OrderItem item={item} key={item.pizzaId} ingredients={fetcher.data?.find(el => el.id === item.pizzaId)?.ingredients ?? []} isLoadingIngredients={fetcher.state === 'loading'} /></li>)}
        </ul>
  
        <div className="space-y-2 bg-stone-200 px-6 py-6">
          <p className="text-sm font-medium text-stone-600">Total cost of cart: {formatCurrency(orderPrice)}</p>
          {priority && <p className="text-sm font-medium text-stone-600">Price for priority: {formatCurrency(priorityPrice)}</p>}
          <p className="text-sm font-medium text-stone-600">Final price: {formatCurrency(orderPrice + priorityPrice)}</p>
          {/* <p className="text-sm font-medium text-stone-600">Address: { address}</p> */}
        </div>
        {!priority && <UpdateOrder order={order} />}
      </div>
    );
  }


export async function loader({params}){
  const order = await getOrder(params.orderId)
  return order;
}
  
  export default Order;