import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const OcassionCard = (props) => {

  const ocassions = props.list

  return (
    <div className='lg:mx-40 md:mx-20 xs:mx-4 py-14 gap-10 flex flex-col justify-center items-center'>
      <h1 className='text-6xl xs:text-5xl'>OCASSIONS</h1>
      <div className='flex gap-10 flex-row flex-wrap justify-center align-center'>
        { ocassions && ocassions.map((item) => (
              <Link className='flex flex-col gap-3 justify-center items-center' to={`/products/${item.title}`}>
                <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col gap-5 justify-center items-center">
                  <img
                    className="overflow-hidden object-cover w-60 h-60"
                    src={item.image.url}
                    alt='ocassion'
                  />
                </motion.div>
                <motion.p whileHover={{ textDecoration: 'underline' }} className="text-xl text-black font-semibold">{item.title}</motion.p>
              </Link>  
            ))
          }
      </div>
    </div>
  )
}

export default OcassionCard
