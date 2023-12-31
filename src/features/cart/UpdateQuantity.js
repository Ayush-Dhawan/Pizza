import React from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { decreaseQuantity, increaseQuantity } from './CartSlice';

export default function UpdateQuantity({pizzaId, quantity}) {
    const dispatch = useDispatch();
  return (
    <div className='flex items-center'>
      <Button type="round" onClick={() => dispatch(increaseQuantity(pizzaId))}>+</Button>
      <span>{quantity}</span>
      <Button type="round" onClick={() => dispatch(decreaseQuantity(pizzaId))} >-</Button>
    </div>
  )
}
