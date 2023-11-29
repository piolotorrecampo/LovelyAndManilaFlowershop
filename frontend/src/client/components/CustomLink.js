import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CustomLink = (props) => {
  return (
    <Link to={props.destination}>
      <motion.div
        whileHover={{ scale: 1.1, textDecoration: 'underline' }}
        whileTap={{ scale: 0.9 }}
      >
        <p>{props.title}</p>
      </motion.div>
    </Link>
  )
}

export default CustomLink
