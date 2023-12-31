import { useState } from "react";
import {Form, redirect, useNavigation, useActionData} from 'react-router-dom'
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import {useSelector, useDispatch} from 'react-redux'
import store from  '../../store'
import { clearCart, getTotalCartPrice } from "../cart/CartSlice";
import { fetchAddress } from "../user/UserSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     price: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     price: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     price: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(state => state.cart.cart)
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting"
  const {username, status: addressStatus, position, address, error: errorAddress } = useSelector(state => state.user)
  const formErrors = useActionData();
  const dispatch = useDispatch();

  const isLoadingAddress = addressStatus === 'loading'
  
  const cartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? cartPrice * 0.2 : 0
  const finalPrice = priorityPrice + cartPrice;


  if(!cart.length) return <div> <Button type="small" to='/menu'>Back to menu</Button> <p className='text-xl font-bold h-full w-full flex items-center justify-center'>Hey {username}, your cart is empty</p></div>

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold">Ready to order? Let's go!</h2>

  
      <Form method="POST" action="/order/new">
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col sm:flex-row sm:items-center">
          <label  className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          {formErrors?.phone && <p className="text-xs mx-auto mt-2 bg-red-200 text-red-700 rounded-md p-2">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
            className="input w-full"
            disabled = {isLoadingAddress}
            defaultValue={address}
             type="text" name="address" required />
             {addressStatus === 'error' && <p className="text-xs mx-auto mt-2 bg-red-200 text-red-700 rounded-md p-2">{errorAddress}</p>}
          </div>
              {!position.longitude && !position.latitude && <span className="absolute right-[1px] z-50 top-[25px] sm:mt-[-1.40rem] sm:top[35px] sm:right-[5px]">
              <Button disabled = {isLoadingAddress} type="small" onClick={(e) =>{ 
                e.preventDefault();
                dispatch(fetchAddress())}}>Get Position</Button>
              </span>}
        </div>

        <div className="mb-12 flex items-center gap-5 font-medium">
          <input
            type="checkbox"
            className="h-6 w-6 accent-orange-300 "
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name = "position" value = {position.longitude && position.latitude ? `${position.latitude}, ${position.longitude}` : ''} />
          <Button type="primary"
           disabled={isSubmitting || isLoadingAddress}>{isSubmitting ? "Placing order" : `Order now for ${finalPrice}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData);


  console.log(data);

  const order = {...data, cart: JSON.parse(data.cart), priority: data.priority === 'true'};
  // console.log(order)

  const errors = {}
  
  if(!isValidPhone(order.phone)) errors.phone = "Please give us a valid phone number, we might have to contact you"
  if(Object.keys(errors).length > 0) return errors;
  
  //if all okay then redirect
  const newOrder = await createOrder(order);

  store.dispatch(clearCart())
   
  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;