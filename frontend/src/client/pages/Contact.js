import React from 'react';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import TopBanner from '../components/Header/TopBanner';
import LogoBanner from '../components/Header/LogoBanner';
import Navbar from '../components/Header/Navbar';
import SubBanner from '../components/Header/SubBanner';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className='flex flex-col justify-center'>
      <div className='sticky top-0 w-full'>
        <TopBanner
        leftContent="+63 917 3277 116"
        centerContent="Open at 6 am to 8 pm"
        rightContent="manilaflowershop@yahoo.com"
      />
      </div>  
      <LogoBanner />
      <div className='lg:sticky lg:top-8 md:sticky md:top-8'>
        <Navbar />
      </div>
      <SubBanner 
        title="Contacts"
        page="contact"
      />
      <div className="lg:mx-40 md:mx-20 py-16 gap-10 flex flex-row justify-center items-center flex-wrap">
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
