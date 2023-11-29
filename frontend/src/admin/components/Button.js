import React from 'react'
import { motion } from 'framer-motion'
import {Link} from 'react-router-dom'

const Button = (props) => {
  return (
    <Link to={props.to}>
      <motion.button
        className="bg-background text-foreground px-5 py-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={props.onClick}
      >
        {props.title}
      </motion.button>
    </Link>
  )
}

export default Button
