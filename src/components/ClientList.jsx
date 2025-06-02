import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ClientList() {
  const [clients, setClients] = useState([])
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })

  const fetchClients = async () => {
    const res = await axios.get('http://localhost:5000/clients', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    setClients(res.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/clients', form, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    setForm({ name: '', email: '', phone: '', notes: '' })
    fetchClients()
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/clients/${id}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    fetchClients()
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return (
    <div>
      <h3>Clients</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <textarea placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
        <button type="submit">Add Client</button>
      </form>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            {client.name} - {client.email} <button onClick={() => handleDelete(client.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
