import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'attorney' })
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/auth/register', form)
      alert('Registered successfully!')
      navigate('/')
    } catch (err) {
      alert('Registration failed: ' + err.response.data.error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <select name="role" onChange={handleChange}>
        <option value="attorney">Attorney</option>
        <option value="paralegal">Paralegal</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  )
}
