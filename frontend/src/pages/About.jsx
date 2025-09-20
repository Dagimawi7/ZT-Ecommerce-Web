import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      
      {/* Page title: ABOUT US */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About section with image + text */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
          At ZT, we believe soccer is more than just a game — it’s a passion, a lifestyle,
           and a way to connect people all around the world. Our brand was built on the love of 
           the sport, with a mission to provide players and fans alike with high-quality, stylish, 
           and affordable soccer kits. Every kit we design is inspired by the energy and spirit of the game, 
           so that whether you’re on the field or cheering from the sidelines, you can feel part of something bigger.
          </p>
          <p>
          We pride ourselves on blending performance and style in every piece. Our kits are crafted with breathable, 
          durable materials to keep you comfortable during intense matches, while also reflecting the bold identity 
          of modern soccer culture. At ZT, it’s not just about wearing a jersey — it’s about expressing your passion for the game,
           your team, and yourself. Join us, and wear your love for soccer with pride.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>At ZT, our mission is to fuel the passion of every soccer player and fan by delivering high-quality, stylish, and affordable kits that inspire confidence on and off the field.</p>
        </div>
      </div>

       {/* Section title: WHY CHOOSE US */}
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

       {/* Three feature boxes: Quality, Convenience, Service */}
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>ZT guarantees top-quality soccer kits built for durability, comfort, and performance.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience: </b>
          <p className='text-gray-600'>ZT makes it easy to get your favorite soccer kits with a simple, fast, and convenient shopping experience.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Execpitonal Customer Service: </b>
          <p className='text-gray-600'>ZT is dedicated to exceptional customer service, always ready to support you with care, speed, and reliability.</p>
        </div>
      </div>

      {/* Newsletter signup section */}
      <NewsletterBox />
      
    </div>
  )
}

// Export About so it can be used in other files
export default About
