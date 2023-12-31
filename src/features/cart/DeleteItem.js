import React, { useDebugValue } from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { deleteItem } from './CartSlice';

export default function DeleteItem({pizzaId}) {
    const dispatch = useDispatch();

    function handleDelete(){
        dispatch(deleteItem(pizzaId))
    }
  return (
    <Button onClick={handleDelete}  type="small">Delete</Button>
  )
}


