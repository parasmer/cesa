
import React, { useEffect } from 'react';

import { FaFacebook, FaInstagram, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa"
import EventsSection from "../components/EventsSection";
import EventCard from '../components/EventCard';
import { useLocation } from 'react-router-dom';
import { FaMapMarkerAlt } from "react-icons/fa";
import home from "../assets/home.png";
import bgimg from "../assets/bgimg.png";
const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        // Use timeout to ensure DOM is fully rendered before scrolling
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <section id="home" className="w-full bg-gray-100  flex items-center justify-center relative py-28 sm:py-36 md:py-44"
         style={{
           height:100vh,
          backgroundImage: `url(${bgimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2, // Adjust to your liking
          zIndex: 0,
        }}
      >
       
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold text-gray-800">CESA MANIT</h1>
      </div>
      </section>

      <section id="about-us" className="pt-[70px] pb-[70px]  w-full bg-gray-500 ">
       
       
          
       
{/*div1*/}
 <div className="ml-4 mr-6 mt-20 flex flex-col justify-center items-center border rounded-xl bg-blue-200 p-6 gap-6">
  {/* Heading - Always on top */}
{/* default size is 4xl small screen text-3xl greater than size 640px and less than 768px ,medium screen text 4xl size greater than 768px */ }
  <h1 className="text-4xl sm:text-3xl md:text-4xl  font-bold text-white text-center mt-10  mb-10">
    About Us
  </h1>

  {/* Content Section: responsive layout */}
  {/* normal screen flex direction is flex-row but on reducing size flex direction becomes row  lg-represents large screen or main screen size*/}
  <div className="flex flex-col 
 lg:flex-row items-center lg:items-start gap-4 lg-gap:2 w-full">
    
    {/* Image Section */}
    {/*div3*/}
<div className="w-full  lg:w-1/2 lg:ml-20 lg:mr-10">
  <img
    src={home}
    alt="home"
    className="rounded-xl w-full  object-contain shadow-lg mb-6  lg:mr-10"
  />
</div>

{/* Text Section */}
{/*div4*/}
<div className="w-full  lg:w-1/3 text-justify ">
  <p className="text-lg sm:text-base font-medium  text-gray-800 ">
    The Civil Engineering Students' Association (CESA) at Maulana Azad National Institute of Technology (MANIT), Bhopal, was established in 2025 with the vision to foster a strong academic and professional environment for civil engineering students. As a student-run body, CESA aims to bridge the gap between classroom learning and real-world engineering practices. It organizes technical workshops, seminars, industrial visits, guest lectures, and hands-on training sessions to enhance the technical competency of its members. CESA also encourages innovation and leadership through competitions, research presentations, and collaborative projects. By promoting teamwork and professional ethics, the association plays a key role in preparing students for successful careers in civil engineering and related fields. The association also actively collaborates with industry professionals and alumni, creating valuable networking and mentorship opportunities. CESA continues to grow as a vibrant and dynamic platform for students to explore, learn, and contribute meaningfully to the field of civil engineering.
    </p>
</div>

  </div>
</div>


        
      </section>
<EventsSection />
      
      {/* <section id="events" className="pt-[70px] h-auto w-full bg-blue-400 flex flex-col  items-center">
        <h1 className="text-4xl font-bold text-white text-center">Our Events</h1>
  <div className="flex flex-wrap justify-center mt-10">
      {events.map(evt => (
        <EventCard key={evt.id} event={evt} />
       
      ))}
       
    </div>
      
    </section> */}


{/*contact us */}
       <section
      id="contact-us"
        className="bg-[#111827] min-h[40vh] text-white w-full px-4 pt-14 pb-2 " // G1 = pt-14, mt-10
      >
        <div className="max-w-7xl mx-auto flex flex-col justify-center items-center gap-8">
      
          {/* Address and Contact */}
          <div className="w-[50vw] flex flex-col sm:flex-row items-start justify-between text-lg font-medium gap-6">
      
            
            {/* Address */}
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-2 text-orange-500 text-2xl">
                <FaMapMarkerAlt />
                <span className="font-semibold">Address</span>
              </div>
             <a
          href="https://www.google.com/maps/place/Maulana+Azad+National+Institute+of+Technology:+Department+Of+Civil+Engineering/@23.2143308,77.4046763,17z/data=!3m1!4b1!4m6!3m5!1s0x397c42e428619835:0x63ffa480eee4985!8m2!3d23.2143308!4d77.4072512!16s%2Fg%2F1hhj40t96?entry=ttu&g_ep=EgoyMDI1MDYxNS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="text-md text-blue-300 hover:underline"
        >
          Civil Engineering Department <br /> MANIT BHOPAL
        </a>
            </div>
      
            {/* Contact */}
            <div className="flex flex-col items-center sm:items-start mt-6 sm:mt-0">
              <div className="text-orange-500 text-2xl font-semibold mb-1">Contact</div>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=cesamanitbhopal@gmail.com" target="_blank" 
  rel="noopener noreferrer" className="text-md text-blue-300">cesamanitbhopal@gmail.com</a>
            </div>
          </div>
      
          {/* Social Links */}
          <div className="text-center mt-6">
            <p className="lg:text-2xl sm:text-md sm:text-base sm:font-medium lg:font-semibold text-orange-400 mb-3">
              Get connected with us on social networks
            </p>
            <div className="flex gap-6 justify-center">
              <a href="https://instagram.com/cesa.manit" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="lg:text-3xl sm:text-xl hover:text-pink-500 transition" />
              </a>
              <a href="https://linkedin.com/company/cesa-manitbhopal" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="lg:text-3xl sm:text-xl hover:text-blue-500 transition" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61573877992376" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="lg:text-3xl sm:text-xl hover:text-blue-400 transition" />
              </a>
            </div>
          </div>
      
          {/* Copyright */}
          <div className="text-center lg:text-2xl sm:text-sm mt-4 mb-0 lg:mb-1">
            <p className="flex items-center justify-center gap-1 text-gray-400">
              <FaRegCopyright className="mt-[2px]" />
              2025 Copyright: <span className="text-amber-500 font-medium">CESA MANIT BHOPAL</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
