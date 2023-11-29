import React, {useState} from 'react';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Button from '../components/Button'
import Maps from '../components/Map'

import TopBanner from '../components/Header/TopBanner';
import LogoBanner from '../components/Header/LogoBanner';
import Navbar from '../components/Header/Navbar';
import SubBanner from '../components/Header/SubBanner';
import Footer from '../components/Footer';

const Contact = () => {
  const [name, setName] = useState('') 
  const [email, setEmail] = useState('') 
  const [message, setMessage] = useState('') 

  return (
    <div className='flex flex-col justify-center'>
      <div className='sticky top-0 w-full'>
        <TopBanner
        leftContent="+63 123 123 1234"
        centerContent="Open at 7 am to 10 pm"
        rightContent="example@gmail.com"
      />
      </div>  
      <LogoBanner />
      <div className='sticky top-8'>
        <Navbar />
      </div>
      <SubBanner 
        title="Contacts"
        page="contact"
      />
      <div className="mx-40 py-16 gap-10 flex flex-row justify-center items-center flex-wrap">
        <IconCard title="Call us: +63 123 123 1234" icon={<LocalPhoneIcon />} />
      <IconCard
          title="Monday - Sunday, 7:00 am - 10:00 pm"
          icon={<AccessTimeIcon />}
        />
        <IconCard
          title="Stall#3 J. Chanyungco St., Marikina City, 1800 Metro Manila, Marikina City, Philippines"
          icon={<LocationOnIcon />}
        />
        <IconCard
          title="manilaflowershop@yahoo.com "
          icon={<MailOutlineIcon />}
        />
      </div>
      <div className="flex pb-10 flex-col gap-10 justify-center items-center">
        <h2 className="text-4xl">Our Location</h2>
        <Maps/>
      </div>
      <div className="mx-40 flex pb-10 flex-col gap-10 justify-center items-center">
        <h2 className="text-4xl">Lets Talk!</h2>
        <form className='flex flex-col justify-center gap-1'>
          <div>
            <h4>Full Name</h4>
            <input className='border' type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target)}/>
            <h4>Email</h4>
            <input className='border' type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target)}/>
          </div>
          <h4>Message</h4>
          <textarea className='border' id="message" name="message" rows="4" cols="50" value={message} onChange={(e) => setMessage(e.target)}/>
          <Button title="Sumbit" />
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Contact

const IconCard = (props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 h-72 w-72 shadow-xl">
      <div className="scale-[2]">{props.icon}</div>
      <p className="text-center">{props.title}</p>
    </div>
  )
}
