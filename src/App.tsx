import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Crown, X, MapPin, Clock, ChevronRight } from 'lucide-react'
import Reviews from './components/Reviews'

const VIDEO_URL = '/hero.mp4'

interface Venue { name: string; url: string }

const NAV_LINKS = [
  { label: 'Marcas',   href: '#marcas' },
  { label: 'Eventos',  href: '#eventos' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

const BRANDS = [
  {
    id: 'bellaqueo',
    num: '01',
    name: 'Bellaqueo',
    age: 'Todos los públicos',
    desc: 'La fiesta más vibrante del ecosistema. Reggaeton, afrobeats y urbano sin límites.',
    tags: ['Reggaeton', 'Afrobeats', 'Urbano'],
    color: '#FF2D6B',
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80',
    venues: [] as Venue[],
  },
  {
    id: 'glass',
    num: '02',
    name: 'Glass',
    age: '18 – 20 años',
    desc: 'La primera gran noche. Un espacio seguro, fresco y memorable para quienes empiezan a descubrir Madrid.',
    tags: ['First Night', 'Seguro', 'Madrid'],
    color: '#00C2FF',
    img: 'https://images.unsplash.com/photo-1544785349-c4a5301826fd?auto=format&fit=crop&w=900&q=80',
    venues: [] as Venue[],
  },
  {
    id: 'nochesmad',
    num: '03',
    name: 'Nochesmad',
    age: '18 – 23 años',
    desc: 'Madrid de noche como nunca la habías vivido. El concepto que está definiendo toda una generación.',
    tags: ['Madrid', 'Gen Z', 'Tendencia'],
    color: '#7B3FE4',
    img: 'https://images.unsplash.com/photo-1578736641330-3155e606cd40?auto=format&fit=crop&w=900&q=80',
    venues: [
      { name: 'STARLITE',         url: 'https://www.fourvenues.com/logan@starlite' },
      { name: 'LA SANTA',         url: 'https://www.fourvenues.com/es/equipo-nochesmad@la-santa-madrid' },
      { name: 'BONDED',           url: 'https://www.fourvenues.com/es/equipo-nochesmad@bonded' },
      { name: 'CATS',             url: 'https://www.fourvenues.com/es/equipo-nochesmad@cats-madrid' },
      { name: 'CHAMÁN',           url: 'https://www.fourvenues.com/es/equipo-nochesmad@chaman' },
      { name: 'EPOKA',            url: 'https://www.fourvenues.com/es/equipo-nochesmad@epoka-the-club' },
      { name: 'FITZ MADRID',      url: 'https://www.fourvenues.com/es/equipo-nochesmad@fitz-madrid' },
      { name: 'GABANA MIÉRCOLES', url: 'https://www.fourvenues.com/es/equipo-nochesmad@gabana' },
      { name: 'HABANERA JUEVES',  url: 'https://www.fourvenues.com/es/logan@night-out-events-1' },
      { name: 'LULA',             url: 'https://web.fourvenues.com/es/equipo-nochesmad@lula-club' },
      { name: 'MARVEL',           url: 'https://www.fourvenues.com/es/equipo-nochesmad@marvel-madrid' },
      { name: 'PANDA',            url: 'https://web.fourvenues.com/es/equipo-nochesmad@panda1' },
      { name: 'MON',              url: 'https://www.fourvenues.com/es/equipo-nochesmad@sala-mon' },
      { name: 'OH MY CLUB',       url: 'https://www.fourvenues.com/es/equipo-nochesmad@oh-my-club' },
      { name: 'MORRIS',           url: 'https://www.fourvenues.com/es/equipo-nochesmad@morris' },
      { name: 'TIFFANYS',         url: 'https://www.fourvenues.com/es/equipo-nochesmad@tiffanys-the-club1' },
      { name: 'VANDIDO',          url: 'https://www.fourvenues.com/es/equipo-nochesmad@vandido' },
    ] as Venue[],
  },
  {
    id: 'affair',
    num: '04',
    name: 'Affair',
    age: '+24 años',
    desc: 'Para quienes saben lo que quieren. Sofisticación, selección musical y ambiente cuidado al detalle.',
    tags: ['Premium', 'Exclusivo', 'Sofisticado'],
    color: '#FFB020',
    img: 'https://images.unsplash.com/photo-1553190842-24c3f93ba116?auto=format&fit=crop&w=900&q=80',
    venues: [] as Venue[],
  },
  {
    id: 'geek',
    num: '05',
    name: 'Gen Z Geek',
    age: 'TCG · Coleccionismo',
    desc: 'Pokémon, One Piece TCG, Magic: The Gathering. El coleccionismo de cartas como cultura viva.',
    tags: ['Pokémon TCG', 'OPTCG', 'MTG'],
    color: '#00D48A',
    img: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=900&q=80',
    venues: [] as Venue[],
  },
]

const EVENTS = [
  { date: '14', month: 'Jun', name: 'Bellaqueo Vol. 12', venue: 'Teatro Barceló', time: '23:00 – 06:00', price: '12€', brand: 'Bellaqueo', color: '#FF2D6B', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=700&q=75' },
  { date: '21', month: 'Jun', name: 'Glass Summer Edition', venue: 'Kapital', time: '22:30 – 05:30', price: '10€', brand: 'Glass', color: '#00C2FF', img: 'https://images.unsplash.com/photo-1544785349-c4a5301826fd?auto=format&fit=crop&w=700&q=75' },
  { date: '28', month: 'Jun', name: 'Nochesmad × Verano', venue: 'Fabrik', time: '23:00 – 07:00', price: '15€', brand: 'Nochesmad', color: '#7B3FE4', img: 'https://images.unsplash.com/photo-1578736641330-3155e606cd40?auto=format&fit=crop&w=700&q=75' },
  { date: '5',  month: 'Jul', name: 'Affair — Golden Night', venue: 'Opium Madrid', time: '00:00 – 06:00', price: '20€', brand: 'Affair', color: '#FFB020', img: 'https://images.unsplash.com/photo-1553190842-24c3f93ba116?auto=format&fit=crop&w=700&q=75' },
  { date: '12', month: 'Jul', name: 'Pokémon TCG — Torneo Asgard', venue: 'Centro Cultural', time: '11:00 – 20:00', price: 'Gratis', brand: 'Gen Z Geek', color: '#00D48A', img: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=700&q=75' },
  { date: '19', month: 'Jul', name: 'Asgard All Stars Fest', venue: 'Madrid — TBC', time: 'Toda la noche', price: 'TBA', brand: 'All Stars', color: '#FF2D6B', img: 'https://images.unsplash.com/photo-1630395822970-acd6a691d97e?auto=format&fit=crop&w=700&q=75' },
]

/* ── Reveal hook ─────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function RevealBlock({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Marquee ─────────────────────────────────────── */
const MARQUEE_ITEMS = ['Bellaqueo', 'Glass', 'Nochesmad', 'Affair', 'Gen Z Geek', 'Asgard Events', 'Madrid']

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeBrand, setActiveBrand] = useState(-1)
  const [scrolled, setScrolled] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSubmit = () => {
    if (email.includes('@')) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3500)
    }
  }

  return (
    <div className="bg-[#080808] text-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════════
          STICKY NAV
      ═══════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5 lg:py-6 transition-all duration-500 ${
          scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06]' : ''
        }`}
      >
        <a href="#" className="font-podium text-white font-bold uppercase text-xl sm:text-2xl tracking-wider">
          ASGARD<span className="text-white/30">.</span>EVENTS
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="font-inter text-sm text-white/70 tracking-widest uppercase hover:text-white transition-colors duration-200">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contacto" className="hidden md:flex items-center gap-2 border border-white/30 hover:border-white/60 hover:bg-white/10 px-6 py-3 text-xs text-white tracking-widest uppercase transition-all duration-200">
          ENTRADAS <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <button className="md:hidden flex flex-col space-y-1.5" onClick={() => setMenuOpen(true)} aria-label="Abrir menú">
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-4 h-0.5 bg-white" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[60] bg-black/96 backdrop-blur-sm transition-all duration-500 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col h-full px-6 sm:px-10 py-5">
          <div className="flex items-center justify-between mb-12">
            <span className="font-podium text-white font-bold uppercase text-xl sm:text-2xl tracking-wider">ASGARD<span className="text-white/30">.</span>EVENTS</span>
            <button onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white transition-colors"><X className="w-7 h-7" /></button>
          </div>
          <div className="flex flex-col justify-center flex-1 gap-5">
            {NAV_LINKS.map(({ label, href }, i) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                className="font-podium text-white uppercase text-4xl sm:text-5xl transition-all duration-500"
                style={{ transitionDelay: `${i * 80 + 100}ms`, opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(20px)' }}>
                {label}
              </a>
            ))}
            <a href="#contacto" onClick={() => setMenuOpen(false)}
              className="mt-4 flex items-center gap-2 border border-white/30 hover:border-white/60 px-6 py-3 text-xs text-white tracking-widest uppercase w-fit transition-all duration-500"
              style={{ transitionDelay: `${NAV_LINKS.length * 80 + 100}ms`, opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(20px)' }}>
              ENTRADAS <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          HERO — Fullscreen video
      ═══════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ height: 'clamp(380px, 58vh, 640px)' }}>
        <video className="absolute inset-0 w-full h-full object-cover" src={VIDEO_URL} autoPlay muted loop playsInline />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col h-full px-6 sm:px-10 lg:px-16 pt-20 justify-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4 animate-fade-up">
              <Crown className="w-3.5 h-3.5 text-white/60" />
              <span className="font-inter text-white/60 text-[11px] tracking-[0.3em] uppercase">Madrid · Ocio Nocturno · Cinco Marcas</span>
            </div>
            <h1 className="font-podium text-white uppercase leading-[0.92] tracking-tight animate-fade-up-delay-1" style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)' }}>
              Siente.<br />Vibra.<br />Madrid.
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-6 animate-fade-up-delay-2">
              <a href="#marcas" className="group flex items-center gap-2 bg-white text-black hover:bg-white/90 px-5 py-3 text-[11px] tracking-widest uppercase transition-colors duration-200 font-inter font-semibold">
                VER MARCAS
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="#eventos" className="group flex items-center gap-2 border border-white/30 hover:border-white/60 px-5 py-3 text-white text-[11px] tracking-widest uppercase transition-colors duration-200 font-inter">
                EVENTOS
              </a>
              <div className="hidden sm:flex items-center gap-2 ml-2">
                {[
                  { value: '5',    label: 'Marcas' },
                  { value: '+10K', label: 'Asistentes' },
                ].map(({ value, label }) => (
                  <div key={label} className="flex items-baseline gap-1.5 border-l border-white/20 pl-4">
                    <span className="font-inter text-white font-bold text-lg">{value}</span>
                    <span className="font-inter text-white/40 text-[10px] tracking-widest uppercase">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MARQUEE STRIP
      ═══════════════════════════════════════════════ */}
      <div className="border-y border-white/[0.06] bg-[#0d0d0d] overflow-hidden py-4">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-podium text-white/50 uppercase text-base sm:text-lg tracking-widest mx-6 sm:mx-10 flex-shrink-0">
              {item} <span className="text-white/20 mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MARCAS — Cards + venue grid
      ═══════════════════════════════════════════════ */}
      <section id="marcas" className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <RevealBlock className="flex items-end justify-between mb-10 pb-8 border-b border-white/[0.08]">
            <div>
              <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Nuestras marcas</p>
              <h2 className="font-podium uppercase text-white leading-[0.92]" style={{ fontSize: 'clamp(2.2rem,5vw,4.5rem)' }}>
                Cinco marcas.<br />Un ecosistema.
              </h2>
            </div>
          </RevealBlock>

          {/* Brand cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
            {BRANDS.map((b, i) => {
              const isActive = activeBrand === i
              return (
                <button
                  key={b.id}
                  onClick={() => setActiveBrand(isActive ? -1 : i)}
                  className="group text-left p-5 border transition-all duration-300 focus:outline-none"
                  style={{
                    borderColor: isActive ? b.color + '80' : 'rgba(255,255,255,0.07)',
                    background: isActive ? b.color + '12' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  {/* Top: num + indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-inter text-[10px] tracking-widest uppercase text-white/25">{b.num}</span>
                    <div
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{ background: isActive ? b.color : 'rgba(255,255,255,0.15)' }}
                    />
                  </div>
                  {/* Brand name */}
                  <h3
                    className="font-podium uppercase leading-tight mb-2 transition-colors duration-200 break-words"
                    style={{
                      fontSize: 'clamp(1.4rem,2.5vw,1.8rem)',
                      color: isActive ? b.color : '#fff',
                    }}
                  >
                    {b.name}
                  </h3>
                  {/* Desc */}
                  <p className="font-inter text-white/40 text-xs leading-relaxed mb-4 line-clamp-2">{b.desc}</p>
                  {/* Footer: venue count or soon */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.07]">
                    <span
                      className="font-inter text-[10px] tracking-widest uppercase"
                      style={{ color: b.venues.length > 0 ? b.color : 'rgba(255,255,255,0.25)' }}
                    >
                      {b.venues.length > 0 ? `${b.venues.length} discotecas` : 'Próximamente'}
                    </span>
                    <ChevronRight
                      className="w-3.5 h-3.5 transition-all duration-300"
                      style={{
                        color: isActive ? b.color : 'rgba(255,255,255,0.2)',
                        transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Venue grid — shown when brand with venues is selected */}
          {activeBrand >= 0 && BRANDS[activeBrand].venues.length > 0 && (
            <div
              className="border border-white/[0.08] p-6 sm:p-8"
              style={{ borderTopColor: BRANDS[activeBrand].color + '60' }}
            >
              {/* Venue section header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 rounded-full" style={{ background: BRANDS[activeBrand].color }} />
                <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/40">
                  Discotecas by{' '}
                  <span style={{ color: BRANDS[activeBrand].color }}>
                    @{BRANDS[activeBrand].name.toLowerCase()}
                  </span>
                </p>
                <span className="ml-auto font-inter text-[10px] text-white/20 tracking-widest uppercase">
                  {BRANDS[activeBrand].venues.length} salas
                </span>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
                {BRANDS[activeBrand].venues.map((venue) => (
                  <a
                    key={venue.name}
                    href={venue.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border border-white/[0.07] p-4 hover:border-white/20 transition-all duration-200 hover:bg-white/[0.03]"
                  >
                    {/* Color pip */}
                    <div
                      className="w-5 h-0.5 mb-4 transition-all duration-200 group-hover:w-8"
                      style={{ background: BRANDS[activeBrand].color }}
                    />
                    {/* Name */}
                    <div className="font-podium text-white uppercase leading-tight mb-4 text-sm sm:text-base">
                      {venue.name}
                    </div>
                    {/* CTA */}
                    <div className="flex items-center gap-1 font-inter text-[10px] tracking-widest uppercase text-white/30 group-hover:text-white/70 transition-colors duration-200">
                      Entradas <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Empty state — brand selected but no venues yet */}
          {activeBrand >= 0 && BRANDS[activeBrand].venues.length === 0 && (
            <div className="border border-white/[0.07] p-8 text-center">
              <p className="font-inter text-white/25 text-sm tracking-widest uppercase">
                Discotecas próximamente
              </p>
            </div>
          )}

        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          EVENTOS
      ═══════════════════════════════════════════════ */}
      <section id="eventos" className="py-24 lg:py-32 px-6 sm:px-10 lg:px-16 bg-[#0a0a0a] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="flex items-end justify-between mb-16 pb-10 border-b border-white/[0.08]">
            <div>
              <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Agenda de verano</p>
              <h2 className="font-podium uppercase text-white leading-[0.92]" style={{ fontSize: 'clamp(2.5rem,6vw,5.5rem)' }}>
                Próximos<br />eventos.
              </h2>
            </div>
            <p className="hidden md:block font-inter text-white/25 text-xs tracking-widest uppercase text-right leading-loose">
              Las entradas<br />se agotan.<br />Actúa ya.
            </p>
          </RevealBlock>

          {/* Event rows */}
          <div className="flex flex-col divide-y divide-white/[0.06]">
            {EVENTS.map((ev, i) => (
              <RevealBlock key={i} delay={i * 60}
                className="group grid grid-cols-[60px_1fr_auto] sm:grid-cols-[80px_1fr_120px_auto] lg:grid-cols-[80px_1fr_200px_120px_auto] items-center gap-4 sm:gap-6 lg:gap-8 py-6 cursor-pointer hover:bg-white/[0.02] transition-colors -mx-4 px-4 rounded-sm"
              >
                {/* Date */}
                <div className="text-center">
                  <div className="font-podium text-white text-2xl sm:text-3xl leading-none">{ev.date}</div>
                  <div className="font-inter text-white/30 text-[9px] tracking-widest uppercase mt-1">{ev.month}</div>
                </div>
                {/* Name + venue */}
                <div>
                  <div className="font-podium text-white uppercase text-lg sm:text-xl lg:text-2xl leading-tight mb-1">{ev.name}</div>
                  <div className="flex items-center gap-2 font-inter text-white/35 text-xs">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    {ev.venue}
                  </div>
                </div>
                {/* Time — hidden on mobile */}
                <div className="hidden lg:flex items-center gap-2 font-inter text-white/35 text-xs">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  {ev.time}
                </div>
                {/* Brand chip — hidden on small */}
                <div className="hidden sm:block">
                  <span
                    className="font-inter text-[10px] tracking-widest uppercase px-3 py-1.5 border"
                    style={{ borderColor: ev.color + '40', color: ev.color, background: ev.color + '12' }}
                  >
                    {ev.brand}
                  </span>
                </div>
                {/* Price + CTA */}
                <div className="text-right">
                  <div className="font-podium text-white text-lg sm:text-xl leading-none mb-2">{ev.price}</div>
                  <button
                    onClick={(e) => {
                      const btn = e.currentTarget
                      btn.textContent = '✓ Reservado'
                      setTimeout(() => btn.textContent = 'Ver →', 2500)
                    }}
                    className="font-inter text-[10px] tracking-widest uppercase text-white/40 hover:text-white transition-colors flex items-center gap-1 ml-auto"
                  >
                    Ver <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MANIFESTO / NOSOTROS
      ═══════════════════════════════════════════════ */}
      <section id="nosotros" className="py-24 lg:py-32 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text */}
            <div>
              <RevealBlock>
                <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">Quiénes somos</p>
                <h2 className="font-podium uppercase text-white leading-[0.92] mb-8" style={{ fontSize: 'clamp(2.2rem,5vw,4.5rem)' }}>
                  No somos<br />una promotora.
                </h2>
              </RevealBlock>
              <RevealBlock delay={120}>
                <p className="font-inter text-white/50 text-base sm:text-lg leading-relaxed mb-6 max-w-md">
                  Somos el <strong className="text-white font-semibold">ecosistema de ocio nocturno más diverso de Madrid</strong>. Construimos marcas distintas para momentos distintos.
                </p>
                <p className="font-inter text-white/35 text-sm leading-relaxed max-w-md mb-10">
                  Cada evento es una propuesta honesta hacia su público, sin intentar abarcar más de lo que debemos. Eso es lo que nos hace únicos.
                </p>
              </RevealBlock>
              <RevealBlock delay={200}>
                <div className="grid grid-cols-2 gap-6 mb-10">
                  {[
                    { n: '5',    l: 'Marcas únicas' },
                    { n: '+10K', l: 'Asistentes/temporada' },
                    { n: '18–35',l: 'Rango de edad' },
                    { n: '∞',    l: 'Noches irrepetibles' },
                  ].map(({ n, l }) => (
                    <div key={l} className="border-l border-white/[0.08] pl-4">
                      <div className="font-podium text-white text-3xl leading-none mb-1">{n}</div>
                      <div className="font-inter text-white/35 text-[10px] tracking-wider uppercase">{l}</div>
                    </div>
                  ))}
                </div>
                <a href="#contacto" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 hover:bg-white/5 px-6 py-3 font-inter text-xs text-white tracking-widest uppercase transition-all duration-200">
                  Colabora con nosotros <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </RevealBlock>
            </div>
            {/* Image collage */}
            <RevealBlock delay={100} className="grid grid-cols-2 gap-3">
              <div className="aspect-[3/4] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex flex-col gap-3 mt-8">
                <div className="aspect-square overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1553190842-24c3f93ba116?auto=format&fit=crop&w=500&q=80" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=500&q=80" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          COLABORA — split dark/accent
      ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.06]">
        <RevealBlock className="px-8 sm:px-12 lg:px-16 py-16 lg:py-24 bg-[#0d0d0d] border-b md:border-b-0 md:border-r border-white/[0.06]">
          <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/30 mb-5">La noche</p>
          <h3 className="font-podium uppercase text-white leading-[0.92] mb-5" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            La noche tiene<br />muchas caras.
          </h3>
          <p className="font-inter text-white/40 text-sm leading-relaxed max-w-xs">
            Construimos marcas distintas para momentos distintos. Cada evento, una propuesta honesta.
          </p>
        </RevealBlock>
        <RevealBlock delay={100} className="px-8 sm:px-12 lg:px-16 py-16 lg:py-24 bg-white">
          <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-black/40 mb-5">Colabora</p>
          <h3 className="font-podium uppercase text-black leading-[0.92] mb-5" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            ¿Eres artista<br />o sala?
          </h3>
          <p className="font-inter text-black/50 text-sm leading-relaxed max-w-xs mb-8">
            Si quieres formar parte del ecosistema Asgard, hablemos. Siempre estamos abiertos a nuevas colaboraciones.
          </p>
          <a href="mailto:hola@asgardevents.es"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-inter text-xs tracking-widest uppercase hover:bg-neutral-900 transition-colors">
            Escribirnos <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </RevealBlock>
      </div>

      {/* ═══════════════════════════════════════════════
          NEWSLETTER / CTA
      ═══════════════════════════════════════════════ */}
      <section id="contacto" className="py-24 lg:py-36 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06] bg-[#080808]">
        <div className="max-w-2xl mx-auto text-center">
          <RevealBlock>
            <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">Newsletter</p>
            <h2 className="font-podium uppercase text-white leading-[0.92] mb-6" style={{ fontSize: 'clamp(2.8rem,7vw,6.5rem)' }}>
              ¿Listo para<br />la noche?
            </h2>
            <p className="font-inter text-white/40 text-sm sm:text-base leading-relaxed mb-12 max-w-md mx-auto">
              Suscríbete y sé el primero en enterarte de nuevos eventos, preventas exclusivas y acceso anticipado a todas las marcas Asgard.
            </p>
          </RevealBlock>
          <RevealBlock delay={150}>
            <div className="flex gap-0 border border-white/[0.12] hover:border-white/25 transition-colors max-w-md mx-auto mb-3 focus-within:border-white/30">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="tu@email.com"
                className="flex-1 bg-transparent px-5 py-4 font-inter text-sm text-white placeholder-white/20 outline-none"
              />
              <button
                onClick={handleSubmit}
                className={`px-6 py-4 font-inter text-[11px] tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
                  submitted
                    ? 'bg-white/10 text-white/60'
                    : 'bg-white text-black hover:bg-white/90'
                }`}
              >
                {submitted ? '¡Suscrito! ✓' : 'Suscribirse'}
              </button>
            </div>
            <p className="font-inter text-white/20 text-[10px] tracking-wider uppercase">Sin spam. Baja cuando quieras.</p>
          </RevealBlock>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          RESEÑAS GOOGLE
      ═══════════════════════════════════════════════ */}
      <Reviews />

      {/* ═══════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════ */}
      <footer className="border-t border-white/[0.06] px-6 sm:px-10 lg:px-16 pt-14 pb-8 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-white/[0.06] mb-8">
            {/* Brand col */}
            <div>
              <div className="font-podium text-white uppercase text-xl tracking-widest mb-4">
                ASGARD<span className="text-white/25">.</span>EVENTS
              </div>
              <p className="font-inter text-white/30 text-sm leading-relaxed max-w-xs mb-6">
                La agencia y promotora de ocio nocturno que está reinventando cómo Madrid vive la noche.
              </p>
              <div className="flex gap-2">
                {['IG', 'TK', 'YT', 'TW'].map((s) => (
                  <button key={s} className="w-8 h-8 border border-white/[0.1] font-inter text-[10px] text-white/30 hover:border-white/30 hover:text-white/70 transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {/* Marcas */}
            <div>
              <p className="font-inter text-[9px] tracking-[0.25em] uppercase text-white/25 mb-4">Marcas</p>
              <ul className="space-y-2.5">
                {['Bellaqueo', 'Glass', 'Nochesmad', 'Affair', 'Gen Z Geek'].map((m) => (
                  <li key={m}><a href="#marcas" className="font-inter text-sm text-white/35 hover:text-white transition-colors">{m}</a></li>
                ))}
              </ul>
            </div>
            {/* Empresa */}
            <div>
              <p className="font-inter text-[9px] tracking-[0.25em] uppercase text-white/25 mb-4">Empresa</p>
              <ul className="space-y-2.5">
                {['Quiénes somos', 'Trabaja con nosotros', 'Prensa', 'Artistas'].map((l) => (
                  <li key={l}><a href="#nosotros" className="font-inter text-sm text-white/35 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            {/* Legal + contacto */}
            <div>
              <p className="font-inter text-[9px] tracking-[0.25em] uppercase text-white/25 mb-4">Legal</p>
              <ul className="space-y-2.5 mb-6">
                {['Aviso legal', 'Privacidad', 'Cookies'].map((l) => (
                  <li key={l}><a href="#" className="font-inter text-sm text-white/35 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
              <p className="font-inter text-[9px] tracking-[0.25em] uppercase text-white/25 mb-3">Contacto</p>
              <a href="mailto:hola@asgardevents.es" className="font-inter text-sm text-white/35 hover:text-white transition-colors">
                hola@asgardevents.es
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="font-inter text-white/20 text-[11px] tracking-wider">© 2025 Asgard Events · Madrid</p>
            <p className="font-inter text-white/15 text-[11px] tracking-wider">Diseñado en Madrid</p>
          </div>
        </div>
      </footer>

      {/* Global keyframes */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scrollDown {
          0%, 100% { top: -40%; }
          50% { top: 100%; }
        }
      `}</style>
    </div>
  )
}
