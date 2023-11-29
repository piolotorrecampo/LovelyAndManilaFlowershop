import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'

const BlogPostsCard = (props) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <motion.div
      className="w-96 p-1 shadow-md"
      whileHover={{
        boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.25)',
      }}
    >
      <div className="h-80 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={props.image}
          alt={props.alt}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl">{props.title}</h3>
        <p className="text-sm">{props.date}</p>
      </div>
      <div className="flex justify-end pt-2">
        <p>{props.description}</p>
      </div>
    </motion.div>
  )
}

export default BlogPostsCard
