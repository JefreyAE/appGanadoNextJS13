'use client'
import Login from './login/components/Login'
import Title from './layouts/titleComponent/Title'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 background-login">
      <Title /> 
      <Login/>
    </main>
  )
}
