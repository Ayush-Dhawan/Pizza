import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom';
import { Link} from 'react-router-dom';




export default function LinkButton({to, children, className}) {
    const navigate = useNavigate()

    const classname ='text-blue-500 text-sm hover:text-blue-700'

    if(to === -1) return <button className={classname} onClick={() => navigate(-1)}>&larr; Go back</button>
  return (
    <Link className={classname} to={to}>{children}</Link>
  )
}
