import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ClientList from '../components/ClientList'
import CaseList from '../components/CaseList'

export default function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <ClientList />
      <CaseList />
    </div>
  )
}
