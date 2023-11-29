import React from 'react'
import { NavLink } from 'react-router-dom'

const NavbarAdmin = () => {
  return (
    <nav className="flex justify-center gap-14 text-sm items-center w-full h-9 text-foreground bg-background">
      <NavLink to="/admin/orders">ORDERS</NavLink>
      <NavLink to="/admin/analytics">ANALYTICS</NavLink>
      <NavLink to="/admin/products">PRODUCTS</NavLink>
      <NavLink to="/">LOGOUT</NavLink>
    </nav>
  )
}

export default NavbarAdmin
