import type { NextPage } from 'next'
import { LandingContent } from '../components/landingContent/LandingContent'
import { LayoutPublic } from '../components/layout/LayoutPublic'

const Home: NextPage = () => {
  return (
    <LayoutPublic>
      <LandingContent />
    </LayoutPublic>
  )
}

export default Home
