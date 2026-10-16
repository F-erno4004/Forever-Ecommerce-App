import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletterbox from '../components/Newsletterbox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-112.5' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>We bring you stylish, high-quality clothing that blends comfort, confidence, and the latest fashion trends. Our mission is to make everyday style accessible to everyone, helping you express your individuality with every outfit.</p>
          <p>From timeless essentials to the latest trends, our collections are designed to fit every mood, moment, and lifestyle. Discover your perfect look with us and make every outfit a statement of who you are.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to make fashion effortless, accessible, and inspiring. We strive to provide a seamless shopping experience, exceptional customer service, and clothing that makes you feel confident in your own style.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600' >At our brand, quality is at the heart of everything we do. We carefully select materials and pay attention to every detail to ensure our clothing meets high standards of comfort, durability, and style. From the stitching to the final finish, every piece is designed to provide a reliable and enjoyable wearing experience, so you can look good and feel confident every day.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600' >We believe shopping for your favorite styles should be simple, convenient, and enjoyable. Our website offers an easy-to-use shopping experience, allowing you to explore collections, find the perfect fit, and place orders from anywhere, at any time. With a smooth checkout process and reliable delivery, we make it easier than ever to bring your favorite fashion pieces straight to your doorstep.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600' >We are committed to providing friendly, reliable, and personalized support to make every shopping experience enjoyable. From choosing the perfect outfit to resolving your concerns, we're always here to help you shop with confidence.</p>
        </div>

      </div>

      <Newsletterbox/>
    </div>
  )
}

export default About