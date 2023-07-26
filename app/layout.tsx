import Script from 'next/script'
import './styles/globals.css'
import { Inter } from 'next/font/google'
import Footer from './layouts/footerComponent/Footer'
import  UserProvider from '../contexts/userContext'
import CentralContainer from './layouts/containersComponent/CentralContainer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Registro',
  description: 'Registro ganadero',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
      <html lang="en">
        <head>
          <title>App ganadera</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" crossOrigin="anonymous" as="style" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"></link>
          <Script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" crossOrigin="anonymous" defer></Script>
          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" crossOrigin="anonymous" defer></Script>
        </head>
        <body className={inter.className}>
          <div className="container-fluid mt-2">
            <div className="justify-content-center"> 
              <UserProvider>
                <CentralContainer>
                  {children}
                </CentralContainer>
              </UserProvider>
            </div>
          </div>
          <Footer/>
        </body>
      </html>
  )
}
