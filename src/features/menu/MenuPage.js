import React from 'react'
import { getMenu } from '../../services/apiRestaurant'
import {useLoaderData} from 'react-router-dom'
import MenuItem from './MenuItem'

export default function MenuPage() {

  const menu = useLoaderData()

  return (
    <ul className='divide-y divide-stone-300 px-2 '>
      {menu.map((pizza) => <MenuItem pizza={pizza} key={pizza.id} />)}
    </ul>
  )
}

export async function loader(){
  const menu = await getMenu()
  return menu;
}
