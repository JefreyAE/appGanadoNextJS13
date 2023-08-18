
import Script from 'next/script'
import './styles/globals.css'
import { Inter } from 'next/font/google'
import UserProvider from '../contexts/userContext'
import CentralContainer from './layouts/containersComponent/CentralContainer'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Registro',
  description: 'Registro ganadero',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: 'favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: 'favicon/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: 'favicon/apple-touch-icon.png',
    },
  ],
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      <head>
        <link rel="icon" href="favicon/favicon.ico"/>
        <link rel="stylesheet" href="https:cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>    
        <link rel="stylesheet" href="https:cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" crossOrigin="anonymous" as="style" />
        <link rel="stylesheet" href="https:cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>   
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
      </body>
      <Script src="https:cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" crossOrigin="anonymous" defer></Script>
      <Script src="https:cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" crossOrigin="anonymous" defer></Script> 
    </html>
  )
}
