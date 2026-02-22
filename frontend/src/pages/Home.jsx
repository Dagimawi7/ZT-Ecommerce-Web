import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import FeaturedProducts from '../components/FeaturedProducts'
import OnSale from '../components/OnSale'
import RecommendedForYou from '../components/RecommendedForYou'


const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <OnSale />
      <LatestCollection />
      <BestSeller />
      <RecommendedForYou />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home
