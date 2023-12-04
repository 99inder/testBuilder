import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='w-full z-10 h-[3.5rem] bg-slate-400 fixed top-0 flex items-center justify-center gap-x-7 text-xl font-medium text-slate-50'>
            <NavLink to={"/"} className="hover:text-slate-600 duration-200 rounded-md px-2 py-1 hover:bg-slate-200">
                Build Test
            </NavLink>
            <NavLink to={"/testsList"} className="hover:text-slate-600 duration-200 rounded-md px-2 py-1 hover:bg-slate-200">
                Take Test
            </NavLink>
        </nav>
    )
}

export default Navbar