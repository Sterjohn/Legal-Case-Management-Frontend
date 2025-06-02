import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function CaseList() {
  const [cases, setCases] = useState([])
  const [form, setForm] = useState({ title: '', description: '', status: 'open', deadline: '', clientId: '' })
  const [clients, setClients] = useState([])

  const fetchCases = async () => {
    const res = await axios.get('http://localhost:5000/cases', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    setCases(res.data)
  }

  const fetchClients = async () => {
    const res = await axios.get('http://localhost:5000/clients', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    setClients(res.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/cases', form, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    setForm({ title: '', description: '', status: 'open', deadline: '', clientId: '' })
    fetchCases()
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/cases/${id}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    fetchCases()
  }

  useEffect(() => {
    fetchCases()
    fetchClients()
  }, [])

  return (
    <div>
      <h3>Cases</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Deadline" type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
        <select value={form.clientId} onChange={e => setForm({ ...form, clientId: e.target.value })} required>
          <option value="">Select Client</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button type="submit">Add Case</button>
      </form>
      <ul>
        {cases.map(c => (
          <li key={c.id}>
            {c.title} ({c.status}) - Deadline: {c.deadline?.slice(0,10)}
            <button onClick={() => handleDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
