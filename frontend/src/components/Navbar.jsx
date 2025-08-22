import React from 'react'
import {assets} from '../assets/assets.js'
// import images like logo from assets file
import { NavLink } from 'react-router-dom'
// NavLink lets us create clickable links that change the page without reload

const Navbar = () => {
  return (
    // a flexbox container that spaces items evenly
    // main navbar container
    // "flex" → use flexbox
    // "items-center" → align items vertically in the center
    // "justify-between" → put logo on left, menu on right
    // "py-5" → padding top & bottom
    // "font-medium" → medium text weight
    <div className='flex items-center justify-between py-5 font-medium'>

        <img src={assets.ztlogo} className='w-36' alt="brand logo" />
        {/* Navigation links (menu) */}
        {/* hidden on very small screens, visible on sm+ screens */}
        {/* gap-5 → space between items */}
        {/* text-sm → small text */}
        {/* text-gray-700 → gray colored text */}
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
          <NavLink to='/' className={'flex flex-col items-center gap-1'}>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
          </NavLink>
          <NavLink to='/collection' className={'flex flex-col items-center gap-1'}>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
          </NavLink>
          <NavLink to='/about' className={'flex flex-col items-center gap-1'}>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
          </NavLink>
          <NavLink to='/contact' className={'flex flex-col items-center gap-1'}>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
          </NavLink>
        </ul>
        {/* Row with search and profile icons in the navbar */}
        <div className='flex items-center gap-6'>
           {/* Search icon */}
          <img src={assets.search} className='w-5 cursor-pointer' alt="" />
           {/* Profile icon */}
          <div className='group relative'>
            <img className='w-5 cursor-pointer' src={assets.profile} alt="" />
          </div>
        </div>

    </div>
  )
}

export default Navbar
