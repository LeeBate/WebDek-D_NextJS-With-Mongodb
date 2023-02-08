import Link from 'next/link'
import { ReactNode } from 'react'
import CookieConsent from '../banners/CookieConsent'
import ScrollToTop from '../ScrollToTop'
import NavBar from '../NavBar'
import Notify from '../Notify'
import Modal from '../Modal'
import Reserved from '../Reserved'

export const Container = ({ children }: { children: ReactNode }) => (
  <div >{children}</div>
)

const PublicLayout = ({ children }: { children: ReactNode }) => {
  
    return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop/>
            <Notify />
            <Modal />
            <NavBar /> 
        <Container>{children}</Container>
      <CookieConsent />
      <Reserved/>
    </div>
  )
}

export default PublicLayout