import React from 'react'
import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import UserName from '../features/user/userName'

export default function Header() {
  return (
    <header className=' flex items-center justify-around bg-orange-300 uppercase px-4 py-3 border-b border-stone-200 sm:px-6'>
      <Link to='/' className='tracking-widest text-stone-600'>Pizza-Bay</Link>
      <SearchOrder />
      <UserName />
    </header>
  )
}
