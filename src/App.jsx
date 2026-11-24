import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Navigate } from 'react-router-dom'
import { useState, createContext, useContext, useEffect } from 'react'
import { categories, workers, rooms, universities, mockMessages, mockHistory } from './data'
import './index.css'

const AuthContext = createContext(null)

function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lado_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem('lado_user', JSON.stringify(user))
    else localStorage.removeItem('lado_user')
  }, [user])

  const login = (data) => setUser(data)
  const logout = () => setUser(null)
  const updateUser = (updates) => setUser(prev => ({ ...prev, ...updates }))

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="logo" style={{ marginBottom: 8 }}>
            <div className="logo-mark">L</div>
            Lado
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: 280 }}>
            Connecting students with trusted local services across Kano, Dutse & Bauchi.
          </p>
        </div>
        <div className="footer-company">
          <strong>Built by ADLE WEBDESIGNS</strong>
          <p>
            <a href="mailto:alamienn02@yahoo.com">alamienn02@yahoo.com</a>
          </p>
          <p>
            <a href="tel:09036842183">09036842183</a>
          </p>
        </div>
      </div>
      <div className="container" style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid rgba(15,118,110,0.08)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        © 2026 Lado · ADLE WEBDESIGNS
      </div>
    </footer>
  )
}

function Layout({ children }) {
  const { user, logout } = useAuth()
  return (
    <div className="app">
      <header className="nav">
        <div className="container nav-inner">
          <Link to="/" className="logo">
            <div className="logo-mark">L</div>
            Lado
          </Link>
          <div className="nav-actions">
            {user ? (
              <>
                <Link to={user.role === 'worker' ? '/worker-dashboard' : '/dashboard'} className="btn btn-ghost">
                  Dashboard
                </Link>
                <button className="btn btn-ghost" onClick={logout}>Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">Log in</Link>
                <Link to="/register" className="btn btn-primary">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="hero-badge">For students in Kano · Dutse · Bauchi</div>
            <h1>Rooms, repairs & local help — <span>near your campus</span></h1>
            <p className="hero-lead">
              Lado connects students with trusted room agents, electricians, plumbers, laundry and more.
              Call or WhatsApp in one tap — even when workers are offline.
            </p>
            <div className="hero-ctas">
              <Link to="/search" className="btn btn-primary btn-lg">Find services near you</Link>
              <Link to="/register?role=worker" className="btn btn-outline btn-lg">Join as a worker</Link>
            </div>
            <div className="hero-stats">
              <div className="stat"><strong>Free</strong><span>for students</span></div>
              <div className="stat"><strong>Call + WhatsApp</strong><span>always available</span></div>
              <div className="stat"><strong>Verified</strong><span>local people</span></div>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-title">Popular near you</div>
            <div className="service-chips">
              <span className="chip chip-active">Rooms</span>
              <span className="chip">Electrician</span>
              <span className="chip">Laundry</span>
              <span className="chip">AC Repair</span>
            </div>
            {workers.slice(0, 3).map(w => (
              <Link to={`/worker/${w.id}`} key={w.id} className="mini-worker">
                <div className="avatar">{w.name.charAt(0)}</div>
                <div className="mini-worker-info">
                  <strong>{w.name} · {w.service}</strong>
                  <span>{w.area}</span>
                </div>
                {w.verified && <span className="verified">Verified</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Everything students actually need</h2>
            <p>From finding a room to fixing your fridge.</p>
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link to={`/search?cat=${cat.id}`} key={cat.id} className="category-card">
                <div className="category-icon">{cat.icon}</div>
                <h3>{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Built for both sides</h2>
            <p>Students get help fast. Workers get real customers.</p>
          </div>
          <div className="dual-grid">
            <div className="audience-card students">
              <h3>For Students</h3>
              <p>Find trusted local help around your campus.</p>
              <ul className="feature-list">
                <li>Workers and rooms near your university</li>
                <li>Call or WhatsApp in one tap</li>
                <li>Verified profiles + student reviews</li>
                <li>In-app messages and history</li>
                <li>Completely free</li>
              </ul>
              <Link to="/search" className="btn btn-primary">Start finding help</Link>
            </div>
            <div className="audience-card workers">
              <h3>For Workers & Agents</h3>
              <p>Get discovered by students who need you.</p>
              <ul className="feature-list">
                <li>Free profile in minutes</li>
                <li>Show phone & WhatsApp</li>
                <li>Receive in-app messages</li>
                <li>Edit services anytime</li>
                <li>Report bad behaviour</li>
              </ul>
              <Link to="/register?role=worker" className="btn btn-coral">Join as a worker</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>How Lado works</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h3>Tell us what you need</h3>
              <p>Choose a service or search for rooms.</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>See people near you</h3>
              <p>View profiles, ratings and available rooms.</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>Call, WhatsApp or message</h3>
              <p>Connect directly. Real help, no long forms.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="cta-band">
          <h2>Ready to make campus life easier?</h2>
          <p>Join students and local workers across Kano, Dutse and Bauchi.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-coral btn-lg">Get Started Free</Link>
            <Link to="/register?role=worker" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
              I want to offer services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
function Search() {
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('')
  const params = new URLSearchParams(window.location.search)
  const catFromUrl = params.get('cat') || ''
  const currentCat = activeCat || catFromUrl

  const filteredWorkers = workers.filter(w => {
    const matchCat = !currentCat || w.category === currentCat
    const matchQ = !query ||
      w.name.toLowerCase().includes(query.toLowerCase()) ||
      w.service.toLowerCase().includes(query.toLowerCase()) ||
      w.area.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  const filteredRooms = (currentCat === 'rooms' || !currentCat)
    ? rooms.filter(r =>
        !query ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.location.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 48 }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>Find help near you</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Search workers and rooms in Kano, Dutse & Bauchi</p>

      <input
        className="search-input"
        placeholder="Search by service, name or area..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div className="service-chips" style={{ margin: '20px 0' }}>
        <button type="button" className={`chip ${!currentCat ? 'chip-active' : ''}`} onClick={() => setActiveCat('')}>All</button>
        {categories.map(c => (
          <button
            type="button"
            key={c.id}
            className={`chip ${currentCat === c.id ? 'chip-active' : ''}`}
            onClick={() => setActiveCat(c.id)}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      {filteredRooms.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>Available Rooms</h2>
          <div className="cards-grid">
            {filteredRooms.map(r => (
              <div key={r.id} className="card">
                <div className="card-img">🏠</div>
                <div className="card-body">
                  <h3>{r.title}</h3>
                  <p className="price">₦{r.price.toLocaleString()} / year</p>
                  <p className="muted">{r.location} · {r.availableFrom}</p>
                  <p className="muted">Agent: {r.agent}</p>
                  <Link to={`/worker/${r.agentId}`} className="btn btn-primary" style={{ marginTop: 12, width: '100%' }}>
                    Contact Agent
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>Workers</h2>
      <div className="cards-grid">
        {filteredWorkers.map(w => (
          <Link to={`/worker/${w.id}`} key={w.id} className="card worker-card">
            <div className="card-body">
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                <div className="avatar" style={{ width: 48, height: 48 }}>{w.name.charAt(0)}</div>
                <div>
                  <h3 style={{ margin: 0 }}>{w.name}</h3>
                  <p className="muted" style={{ margin: 0 }}>{w.service}</p>
                </div>
              </div>
              <p className="muted">{w.area}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                <span>⭐ {w.rating} ({w.reviews})</span>
                {w.verified && <span className="verified">Verified</span>}
              </div>
              <span className={`status ${w.available ? 'available' : 'busy'}`}>
                {w.available ? 'Available' : 'Busy'}
              </span>
            </div>
          </Link>
        ))}
      </div>
      {filteredWorkers.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No workers found for this filter.</p>}
    </div>
  )
}

function WorkerProfile() {
  const { id } = useParams()
  const { user } = useAuth()
  const worker = workers.find(w => w.id === Number(id))
  if (!worker) return <div className="container" style={{ padding: 40 }}>Worker not found</div>

  const callLink = `tel:${worker.phone}`
  const waLink = `https://wa.me/${worker.whatsapp}?text=${encodeURIComponent(`Hi ${worker.name}, I saw your profile on Lado. I'm a student looking for ${worker.service}. Are you available?`)}`

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 48, maxWidth: 640 }}>
      <div className="card" style={{ padding: 28 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
          <div className="avatar" style={{ width: 72, height: 72, fontSize: '1.6rem' }}>{worker.name.charAt(0)}</div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{worker.name}</h1>
            <p style={{ margin: '4px 0', color: 'var(--text-muted)' }}>{worker.service}</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span>⭐ {worker.rating} ({worker.reviews} reviews)</span>
              {worker.verified && <span className="verified">Verified</span>}
            </div>
          </div>
        </div>
        <p style={{ marginBottom: 16 }}>{worker.bio}</p>
        <p className="muted" style={{ marginBottom: 8 }}>📍 {worker.area}</p>
        <p className={`status ${worker.available ? 'available' : 'busy'}`} style={{ marginBottom: 24 }}>
          {worker.available ? '● Available now' : '● Currently busy'}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href={callLink} className="btn btn-primary btn-lg">📞 Call Now</a>
          <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-coral btn-lg">💬 WhatsApp</a>
          {user && (
            <Link to="/messages" className="btn btn-outline btn-lg">In-app Message</Link>
          )}
        </div>
        {user && (
          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <Link to={`/report?target=${worker.name}`} className="btn btn-ghost" style={{ color: '#b91c1c', fontSize: '0.9rem' }}>
              Report this person
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login({
      name: 'Demo User',
      phone,
      email: '',
      university: '',
      role: 'student',
      area: 'Kano',
    })
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="logo" style={{ justifyContent: 'center', marginBottom: 24 }}>
          <div className="logo-mark">L</div> Lado
        </div>
        <h1>Welcome back</h1>
        <p className="muted">Log in to continue</p>
        <form onSubmit={handleSubmit}>
          <input className="input" type="tel" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} required />
          <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>Log in</button>
        </form>
        <p style={{ marginTop: 20, textAlign: 'center' }}>
          No account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  )
}

function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const params = new URLSearchParams(window.location.search)
  const isWorker = params.get('role') === 'worker'
  const [role, setRole] = useState(isWorker ? 'worker' : 'student')
  const [form, setForm] = useState({
    name: '', phone: '', email: '', university: '', service: '', whatsapp: '', area: '', password: ''
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    login({
      name: form.name,
      phone: form.phone,
      email: form.email,
      university: form.university,
      role,
      service: form.service,
      whatsapp: form.whatsapp,
      area: form.area || 'Kano',
      services: form.service ? [form.service] : [],
    })
    navigate(role === 'worker' ? '/worker-dashboard' : '/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="logo" style={{ justifyContent: 'center', marginBottom: 24 }}>
          <div className="logo-mark">L</div> Lado
        </div>
        <h1>Create account</h1>
        <p className="muted">Join free — students & workers</p>

        <div className="role-toggle">
          <button type="button" className={role === 'student' ? 'active' : ''} onClick={() => setRole('student')}>Student</button>
          <button type="button" className={role === 'worker' ? 'active' : ''} onClick={() => setRole('worker')}>Worker / Agent</button>
        </div>

        <form onSubmit={handleSubmit}>
          <input className="input" name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
          <input className="input" name="phone" type="tel" placeholder="Phone number" value={form.phone} onChange={handleChange} required />
          <input className="input" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />

          {role === 'student' && (
            <select className="input" name="university" value={form.university} onChange={handleChange}>
              <option value="">University (recommended)</option>
              {universities.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          )}

          {role === 'worker' && (
            <>
              <select className="input" name="service" value={form.service} onChange={handleChange} required>
                <option value="">Main service</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input className="input" name="whatsapp" placeholder="WhatsApp number" value={form.whatsapp} onChange={handleChange} />
              <input className="input" name="area" placeholder="Areas you cover (e.g. Near BUK, Kano)" value={form.area} onChange={handleChange} />
            </>
          )}

          <input className="input" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
            Create {role === 'worker' ? 'Worker' : 'Student'} Account
          </button>
        </form>
        <p style={{ marginTop: 20, textAlign: 'center' }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}
function Dashboard() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (user.role === 'worker') return <Navigate to="/worker-dashboard" />

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 48 }}>
      <div className="dash-header">
        <div>
          <h1>Hello, {user.name.split(' ')[0]} 👋</h1>
          <p className="muted">{user.university || 'Student'} · {user.area || 'Kano'}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link to="/search" className="btn btn-primary">Find services</Link>
          <Link to="/edit-profile" className="btn btn-outline">Edit profile</Link>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-card">
          <h3>Quick actions</h3>
          <div className="quick-links">
            <Link to="/search">🔍 Search services</Link>
            <Link to="/messages">💬 Messages {mockMessages.filter(m => m.unread).length > 0 && <span className="badge">{mockMessages.filter(m => m.unread).length}</span>}</Link>
            <Link to="/edit-profile">✏️ Edit my details</Link>
            <Link to="/report">🚩 Report someone</Link>
          </div>
        </div>

        <div className="dash-card">
          <h3>Recent activity</h3>
          {mockHistory.map(h => (
            <div key={h.id} className="history-item">
              <div>
                <strong>{h.type}</strong>
                <p className="muted">{h.with} · {h.date}</p>
              </div>
              <span className={`status ${h.status === 'Completed' ? 'available' : 'busy'}`}>{h.status}</span>
            </div>
          ))}
        </div>

        <div className="dash-card">
          <h3>Messages</h3>
          {mockMessages.slice(0, 3).map(m => (
            <div key={m.id} className="history-item">
              <div>
                <strong>{m.from} {m.unread && <span className="badge">new</span>}</strong>
                <p className="muted">{m.text}</p>
              </div>
              <span className="muted" style={{ fontSize: '0.8rem' }}>{m.time}</span>
            </div>
          ))}
          <Link to="/messages" className="btn btn-ghost" style={{ marginTop: 8 }}>View all messages</Link>
        </div>
      </div>
    </div>
  )
}

function WorkerDashboard() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (user.role !== 'worker') return <Navigate to="/dashboard" />

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 48 }}>
      <div className="dash-header">
        <div>
          <h1>Worker Dashboard</h1>
          <p className="muted">{user.name} · {user.service || 'Service provider'}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link to="/edit-profile" className="btn btn-primary">Edit profile & services</Link>
          <Link to="/messages" className="btn btn-outline">Messages</Link>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-card">
          <h3>My details</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>WhatsApp:</strong> {user.whatsapp || '—'}</p>
          <p><strong>Area:</strong> {user.area || '—'}</p>
          <p><strong>Main service:</strong> {categories.find(c => c.id === user.service)?.name || user.service || '—'}</p>
          <Link to="/edit-profile" className="btn btn-outline" style={{ marginTop: 12 }}>Update details</Link>
        </div>

        <div className="dash-card">
          <h3>Services I offer</h3>
          <div className="service-chips">
            {(user.services || [user.service]).filter(Boolean).map(s => (
              <span key={s} className="chip chip-active">
                {categories.find(c => c.id === s)?.name || s}
              </span>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 12 }}>You can add more services from Edit profile.</p>
        </div>

        <div className="dash-card">
          <h3>Incoming messages</h3>
          {mockMessages.map(m => (
            <div key={m.id} className="history-item">
              <div>
                <strong>{m.from} {m.unread && <span className="badge">new</span>}</strong>
                <p className="muted">{m.text}</p>
              </div>
              <span className="muted" style={{ fontSize: '0.8rem' }}>{m.time}</span>
            </div>
          ))}
          <Link to="/messages" className="btn btn-ghost" style={{ marginTop: 8 }}>Open inbox</Link>
        </div>

        <div className="dash-card">
          <h3>Work history (demo)</h3>
          {mockHistory.map(h => (
            <div key={h.id} className="history-item">
              <div>
                <strong>{h.type}</strong>
                <p className="muted">{h.with} · {h.date}</p>
              </div>
              <span className={`status ${h.status === 'Completed' ? 'available' : 'busy'}`}>{h.status}</span>
            </div>
          ))}
        </div>

        <div className="dash-card">
          <h3>Safety</h3>
          <p className="muted" style={{ marginBottom: 12 }}>You can report a customer or another worker if needed.</p>
          <Link to="/report" className="btn btn-outline" style={{ color: '#b91c1c', borderColor: '#b91c1c' }}>Report someone</Link>
        </div>
      </div>
    </div>
  )
}

function Messages() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 48, maxWidth: 640 }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 8 }}>Messages</h1>
      <p className="muted" style={{ marginBottom: 24 }}>In-app chats with workers and customers</p>
      <div className="card" style={{ padding: 0 }}>
        {mockMessages.map(m => (
          <div key={m.id} className="message-row">
            <div className="avatar">{m.from.charAt(0)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{m.from}</strong>
                <span className="muted" style={{ fontSize: '0.8rem' }}>{m.time}</span>
              </div>
              <p className="muted">{m.text}</p>
            </div>
            {m.unread && <span className="badge">new</span>}
          </div>
        ))}
      </div>
      <p className="muted" style={{ marginTop: 16, fontSize: '0.9rem' }}>
        Full real-time chat will be connected when the backend is added.
      </p>
    </div>
  )
}

function EditProfile() {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  if (!user) return <Navigate to="/login" />

  const [form, setForm] = useState({
    name: user.name || '',
    phone: user.phone || '',
    email: user.email || '',
    university: user.university || '',
    area: user.area || '',
    whatsapp: user.whatsapp || '',
    service: user.service || '',
    bio: user.bio || '',
  })
  const [extraServices, setExtraServices] = useState(user.services || [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const toggleService = (id) => {
    setExtraServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const handleSave = (e) => {
    e.preventDefault()
    updateUser({
      ...form,
      services: extraServices.length ? extraServices : (form.service ? [form.service] : []),
    })
    navigate(user.role === 'worker' ? '/worker-dashboard' : '/dashboard')
  }

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 48, maxWidth: 520 }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 8 }}>Edit profile</h1>
      <p className="muted" style={{ marginBottom: 24 }}>Update your details so customers can reach you easily</p>

      <form onSubmit={handleSave} className="card" style={{ padding: 24 }}>
        <input className="input" name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
        <input className="input" name="phone" type="tel" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input className="input" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input className="input" name="area" placeholder="Area / location" value={form.area} onChange={handleChange} />

        {user.role === 'student' && (
          <select className="input" name="university" value={form.university} onChange={handleChange}>
            <option value="">University</option>
            {universities.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        )}

        {user.role === 'worker' && (
          <>
            <input className="input" name="whatsapp" placeholder="WhatsApp number" value={form.whatsapp} onChange={handleChange} />
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, marginTop: 8 }}>Services you offer</label>
            <div className="service-chips" style={{ marginBottom: 16 }}>
              {categories.map(c => (
                <button
                  type="button"
                  key={c.id}
                  className={`chip ${extraServices.includes(c.id) || form.service === c.id ? 'chip-active' : ''}`}
                  onClick={() => toggleService(c.id)}
                >
                  {c.icon} {c.name}
                </button>
              ))}
            </div>
            <textarea className="input" name="bio" placeholder="Short bio about your work" value={form.bio} onChange={handleChange} rows={3} style={{ resize: 'vertical' }} />
          </>
        )}

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 12 }}>Save changes</button>
      </form>
    </div>
  )
}

function Report() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const params = new URLSearchParams(window.location.search)
  const [target, setTarget] = useState(params.get('target') || '')
  const [reason, setReason] = useState('')
  const [sent, setSent] = useState(false)

  if (!user) return <Navigate to="/login" />

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="container" style={{ paddingTop: 48, paddingBottom: 48, maxWidth: 480, textAlign: 'center' }}>
        <h1>Report submitted</h1>
        <p className="muted" style={{ margin: '16px 0 24px' }}>Thank you. Our team will review it. Stay safe.</p>
        <Link to={user.role === 'worker' ? '/worker-dashboard' : '/dashboard'} className="btn btn-primary">Back to dashboard</Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 48, maxWidth: 520 }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 8 }}>Report someone</h1>
      <p className="muted" style={{ marginBottom: 24 }}>Report a customer, worker or agent. We take safety seriously.</p>
      <form onSubmit={handleSubmit} className="card" style={{ padding: 24 }}>
        <input className="input" placeholder="Name of the person" value={target} onChange={e => setTarget(e.target.value)} required />
        <select className="input" value={reason} onChange={e => setReason(e.target.value)} required>
          <option value="">Reason</option>
          <option value="scam">Suspected scam / fraud</option>
          <option value="harassment">Harassment</option>
          <option value="no-show">No-show / unprofessional</option>
          <option value="fake">Fake profile</option>
          <option value="other">Other</option>
        </select>
        <textarea className="input" placeholder="Describe what happened" rows={4} required style={{ resize: 'vertical' }} />
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>Submit report</button>
      </form>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/search" element={<Layout><Search /></Layout>} />
          <Route path="/worker/:id" element={<Layout><WorkerProfile /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/worker-dashboard" element={<Layout><WorkerDashboard /></Layout>} />
          <Route path="/messages" element={<Layout><Messages /></Layout>} />
          <Route path="/edit-profile" element={<Layout><EditProfile /></Layout>} />
          <Route path="/report" element={<Layout><Report /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
