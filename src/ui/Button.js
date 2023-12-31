import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ children, disabled, to, classname, type, onClick }) {
  const baseClasses =
    'bg-orange-300 font-semibold text-stone-800 inline-block px-4 py-3 uppercase tracking-wide rounded-full hover:bg-orange-200 transition-colors duration-300 focus:outline-none focus:bg-orange-300 focus:ring focus:ring-orange-300 focus:ring-offset-2 disabled:cursor-not-allowed text-sm sm:px-6 sm:py-4';

  const base =
    'bg-orange-300 font-semibold text-stone-800 inline-block  uppercase tracking-wide rounded-full hover:bg-orange-200 transition-colors duration-300 focus:outline-none focus:bg-orange-300 focus:ring focus:ring-orange-300 focus:ring-offset-2 disabled:cursor-not-allowed ';

  const styles ={
    primary: base + 'px-4 py-3 md:px6 md:py-4 text-sm',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + ' px-3 py-2 mx-2 md:px-5 md:py-2.5 text-sm',
    secondary: 'bg-stone-300 font-semibold text-stone-800 inline-block px-4 py-3 uppercase tracking-wide rounded-full hover:bg-stone-200 transition-colors duration-300 focus:outline-none focus:bg-stone-200 focus:ring focus:ring-orange-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4'
  }
  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

    if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
