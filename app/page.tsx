'use client'
import LoginComponent from './login/LoginComponent'
import Title from './layouts/titleComponent/Title'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Title /> 
      <LoginComponent/>
    </main>
  )
}
