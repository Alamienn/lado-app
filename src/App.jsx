import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { categories, workers, rooms, universities } from './data'
import './index.css'

function Layout({ children }) {
  return (
    <div className="app">
      <header className="nav">
        <div className="container nav-inner">
          <Link to="/" className="logo">
            <div className="logo-mark">L</div>
            Lado
          </Link>
          <div className="nav-actions">
            <Link to="/login" className="btn btn-ghost">Log in</Link>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="container footer-inner">
          <div className="logo">
            <div className="logo-mark">L</div>
            Lado
          </div>
          <p>© 2026 Lado · Kano · Dutse · Bauchi</p>
        </div>
      </footer>
    </div>
  )
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="hero-badge">🎓 For students in Kano · Dutse · Bauchi</div>
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
            <div className="hero-card-title">🔥 Popular near you</div>
            <div className="service-chips">
              <span className="chip chip-active">Rooms</span>
              <span className="chip">Electrician</span>
              <span className="chip">Laundry</span>
              <span className="chip">AC Repair</span>
            </div>
            {workers.slice(0, 3).map(w => (
              <Link to={`/worker/${w.id}`} key={w.id} className="mini-worker">
                <div className="avatar">{w.name[0]}</div>
                <div className="mini-worker-info">
                  <strong>{w.name} · {w.service}</strong>
                  <span>{w.area}</span>
                </div>
                {w.verified && <span className="verified">✓ Verified</span>}
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
                <li>Room listings with photos & price</li>
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
                <li>Post rooms with photos</li>
                <li>Verified badge after ID check</li>
                <li>Visible in Kano, Dutse & Bauchi</li>
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
              <h3>Call or WhatsApp</h3>
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
    const matchQ = !query || w.name.toLowerCase().includes(query.toLowerCase()) ||
      w.service.toLowerCase().includes(query.toLowerCase()) ||
      w.area.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  const filteredRooms = currentCat === 'rooms' || !currentCat
    ? rooms.filter(r => !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.location.toLowerCase().includes(query.toLowerCase()))
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
        <button className={`chip ${!currentCat ? 'chip-active' : ''}`} onClick={() => setActiveCat('')}>All</button>
        {categories.map(c => (
          <button
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
                <div className="avatar" style={{ width: 48, height: 48 }}>{w.name[0]}</div>
                <div>
                  <h3 style={{ margin: 0 }}>{w.name}</h3>
                  <p className="muted" style={{ margin: 0 }}>{w.service}</p>
                </div>
              </div>
              <p className="muted">{w.area}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                <span>⭐ {w.rating} ({w.reviews})</span>
                {w.verified && <span className="verified">✓ Verified</span>}
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
  const worker = workers.find(w => w.id === Number(id))
  if (!worker) return <div className="container" style={{ padding: 40 }}>Worker not found</div>

  const callLink = `tel:${worker.phone}`
  const waLink = `https://wa.me/${worker.whatsapp}?text=${encodeURIComponent(`Hi ${worker.name}, I saw your profile on Lado. I'm a student looking for ${worker.service}. Are you available?`)}`

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 48, maxWidth: 640 }}>
      <div className="card" style={{ padding: 28 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
          <div className="avatar" style={{ width: 72, height: 72, fontSize: '1.6rem' }}>{worker.name[0]}</div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{worker.name}</h1>
            <p style={{ margin: '4px 0', color: 'var(--text-muted)' }}>{worker.service}</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span>⭐ {worker.rating} ({worker.reviews} reviews)</span>
              {worker.verified && <span className="verified">✓ Verified</span>}
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
        </div>
      </div>
    </div>
  )
}

function Login() {
  const navigate = useNavigate()
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="logo" style={{ justifyContent: 'center', marginBottom: 24 }}>
          <div className="logo-mark">L</div> Lado
        </div>
        <h1>Welcome back</h1>
        <p className="muted">Log in to continue</p>
        <form onSubmit={e => { e.preventDefault(); navigate('/search') }}>
          <input className="input" type="tel" placeholder="Phone number" required />
          <input className="input" type="password" placeholder="Password" required />
          <button className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>Log in</button>
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
  const params = new URLSearchParams(window.location.search)
  const isWorker = params.get('role') === 'worker'
  const [role, setRole] = useState(isWorker ? 'worker' : 'student')

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="logo" style={{ justifyContent: 'center', marginBottom: 24 }}>
          <div className="logo-mark">L</div> Lado
        </div>
        <h1>Create account</h1>
        <p className="muted">Join free — students & workers</p>

        <div className="role-toggle">
          <button className={role === 'student' ? 'active' : ''} onClick={() => setRole('student')}>Student</button>
          <button className={role === 'worker' ? 'active' : ''} onClick={() => setRole('worker')}>Worker / Agent</button>
        </div>

        <form onSubmit={e => { e.preventDefault(); navigate('/search') }}>
          <input className="input" placeholder="Full name" required />
          <input className="input" type="tel" placeholder="Phone number" required />
          <input className="input" type="email" placeholder="Email" required />
          {role === 'student' && (
            <select className="input">
              <option value="">University (optional)</option>
              {universities.map(u => <option key={u}>{u}</option>)}
            </select>
          )}
          {role === 'worker' && (
            <>
              <select className="input" required>
                <option value="">Main service</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input className="input" placeholder="WhatsApp number" />
              <input className="input" placeholder="Areas you cover (e.g. Near BUK, Kano)" />
            </>
          )}
          <input className="input" type="password" placeholder="Password" required />
          <button className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/search" element={<Layout><Search /></Layout>} />
        <Route path="/worker/:id" element={<Layout><WorkerProfile /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
