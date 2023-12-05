import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import DataContext from '../../context/DataContext'

const NavbarAdmin = () => {
  const { logout } = useContext(DataContext)

  return (
    <nav className="flex justify-center gap-14 text-sm items-center w-full h-9 text-foreground bg-background">
      <NavLink to="/admin/orders">ORDERS</NavLink>
      <NavLink to="/admin/analytics">ANALYTICS</NavLink>
      <NavLink to="/admin/products">PRODUCTS</NavLink>
      <NavLink to="/admin/accounts">ACCOUNTS</NavLink>
      <NavLink to="/" onClick={() => logout()}>LOGOUT</NavLink>
    </nav>
  )
}

export default NavbarAdmin
