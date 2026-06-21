import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Crown, X, ChevronDown } from 'lucide-react'
import Reviews from './components/Reviews'

const VIDEO_URL = '/hero.mp4'
interface Venue { name: string; url: string }

/* ── Paletas ─────────────────────────────────────────────── */
const PALETTES = [
  {
    id: 'navy',
    label: 'Oscuro',
    bg:         '#060d24',
    bgAlt:      '#0b1530',
    bgPanel:    '#101c3a',
    fg:         '#ffffff',
    fgMuted:    'rgba(180,205,255,0.50)',
    fgSub:      'rgba(140,170,255,0.30)',
    border:     'rgba(80,130,255,0.15)',
    borderHover:'rgba(120,170,255,0.40)',
    nav:        'rgba(6,13,36,0.92)',
    heroBtnBg:  '#ffffff',
    heroBtnFg:  '#060d24',
  },
  {
    id: 'claro',
    label: 'Claro',
    bg:         '#f0ede7',
    bgAlt:      '#ffffff',
    bgPanel:    '#e8e4dd',
    fg:         '#111111',
    fgMuted:    'rgba(0,0,0,0.50)',
    fgSub:      'rgba(0,0,0,0.30)',
    border:     'rgba(0,0,0,0.10)',
    borderHover:'rgba(0,0,0,0.30)',
    nav:        'rgba(235,232,225,0.94)',
    heroBtnBg:  '#111111',
    heroBtnFg:  '#ffffff',
  },
]

type Palette = typeof PALETTES[number]

/* ── Marcas ──────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Marcas',   href: '#marcas' },
  { label: 'Reseñas',  href: '#resenas' },
  { label: 'Contacto', href: '#contacto' },
]

const BRANDS = [
  {
    id: 'bellaqueo', num: '01', name: 'Bellaqueo',
    desc: 'Reggaeton, afrobeats y urbano sin límites.',
    tags: ['Reggaeton', 'Urbano'],
    color: '#FF3D6B',
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=700&q=80',
    venues: [] as Venue[],
  },
  {
    id: 'glass', num: '02', name: 'Glass',
    desc: 'La primera gran noche. Seguro, fresco y memorable.',
    tags: ['18-20', 'Madrid'],
    color: '#38BDF8',
    img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=700&q=80',
    venues: [] as Venue[],
  },
  {
    id: 'nochesmad', num: '03', name: 'Nochesmad',
    desc: 'Madrid de noche como nunca la habías vivido.',
    tags: ['18-23', 'Gen Z'],
    color: '#A78BFA',
    img: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=700&q=80',
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
    id: 'affair', num: '04', name: 'Affair',
    desc: 'Sofisticación, selección musical y ambiente premium.',
    tags: ['+24', 'Premium'],
    color: '#FBBF24',
    img: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=700&q=80',
    venues: [] as Venue[],
  },
  {
    id: 'geek', num: '05', name: 'Gen Z Geek',
    desc: 'Pokémon TCG, One Piece, Magic. El coleccionismo como cultura.',
    tags: ['TCG', 'Pokémon'],
    color: '#34D399',
    img: 'https://images.unsplash.com/photo-1606503153255-59d5e417b05b?auto=format&fit=crop&w=700&q=80',
    venues: [] as Venue[],
  },
]

const MARQUEE_ITEMS = ['Bellaqueo', 'Glass', 'Nochesmad', 'Affair', 'Gen Z Geek', 'Asgard Events', 'Madrid']

/* ── Reveal ──────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function RevealBlock({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>{children}</div>
  )
}

/* ── App ─────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen]       = useState(false)
  const [activeBrand, setActiveBrand] = useState(-1)
  const [scrolled, setScrolled]       = useState(false)
  const [paletteIdx, setPaletteIdx]   = useState(0)

  const p: Palette = PALETTES[paletteIdx]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const brand = activeBrand >= 0 ? BRANDS[activeBrand] : null

  /* ── shared section style ── */
  const secStyle = { background: p.bg, color: p.fg }
  const altStyle = { background: p.bgAlt, color: p.fg }

  return (
    <div style={{ background: p.bg, color: p.fg }} className="overflow-x-hidden min-h-screen">

      {/* ── Toggle claro/oscuro (floating bottom-right) ── */}
      <button
        onClick={() => setPaletteIdx(i => (i + 1) % 2)}
        className="fixed bottom-5 right-5 z-[70] flex items-center gap-2 px-3.5 py-2 rounded-full shadow-lg backdrop-blur-md transition-all duration-300"
        style={{ background: p.bgPanel, border: `1px solid ${p.border}`, color: p.fgMuted }}
        title={`Cambiar a modo ${PALETTES[(paletteIdx + 1) % 2].label}`}
      >
        <span className="text-base leading-none">{paletteIdx === 0 ? '☀︎' : '◗'}</span>
        <span className="font-inter text-[10px] tracking-widest uppercase">{PALETTES[(paletteIdx + 1) % 2].label}</span>
      </button>

      {/* ── NAV ──────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5 transition-all duration-400"
        style={scrolled ? { background: p.nav, borderBottom: `1px solid ${p.border}`, backdropFilter: 'blur(20px)' } : {}}>
        <a href="#" className="font-podium uppercase text-xl tracking-wider" style={{ color: p.fg }}>
          ASGARD<span style={{ color: p.fgSub }}>.</span>EVENTS
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="font-inter text-sm tracking-widest uppercase transition-colors"
                style={{ color: p.fgMuted }}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="mailto:hola@asgardevents.es"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 text-xs tracking-widest uppercase transition-all font-inter"
          style={{ border: `1px solid ${p.border}`, color: p.fgMuted }}>
          CONTACTO <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <button className="md:hidden flex flex-col space-y-1.5" onClick={() => setMenuOpen(true)}>
          <div className="w-6 h-0.5" style={{ background: p.fg }} />
          <div className="w-6 h-0.5" style={{ background: p.fg }} />
          <div className="w-4 h-0.5" style={{ background: p.fg }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[60] backdrop-blur-sm transition-all duration-400 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        style={{ background: p.bgPanel + 'f8' }}>
        <div className="flex flex-col h-full px-6 py-6">
          <div className="flex items-center justify-between mb-14">
            <span className="font-podium uppercase text-xl tracking-wider" style={{ color: p.fg }}>ASGARD<span style={{ color: p.fgSub }}>.</span>EVENTS</span>
            <button onClick={() => setMenuOpen(false)} style={{ color: p.fgMuted }}><X className="w-7 h-7" /></button>
          </div>
          <div className="flex flex-col justify-center flex-1 gap-6">
            {NAV_LINKS.map(({ label, href }, i) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                className="font-podium uppercase text-4xl transition-all duration-400"
                style={{ color: p.fg, transitionDelay: `${i * 70 + 80}ms`, opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(16px)' }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer: reserva el hueco de la navbar para que no tape el hero */}
      <div style={{ height: '72px', background: p.bg }} />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: 'clamp(460px, 65vh, 780px)' }}>
        <video className="absolute inset-0 w-full h-full object-cover" src={VIDEO_URL} autoPlay muted loop playsInline />
        {/* Overlay — top darkens slightly, bottom fades to bg */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 55%, ${p.bg} 100%)`
        }} />
        {/* Content — vertically centered with equal padding */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 py-20">
          <div className="flex items-center gap-2 mb-8 animate-fade-up">
            <Crown className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.55)' }} />
            <span className="font-inter text-[11px] tracking-[0.32em] uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Madrid · Cinco Marcas · Un Ecosistema
            </span>
          </div>
          <h1 className="font-podium text-white uppercase leading-[0.88] animate-fade-up-delay-1"
            style={{ fontSize: 'clamp(3.8rem, 12vw, 10.5rem)' }}>
            Siente.<br />Vibra.<br />Madrid.
          </h1>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────── */}
      <div className="overflow-hidden py-4" style={{ borderTop: `1px solid ${p.border}`, borderBottom: `1px solid ${p.border}`, background: p.bgAlt }}>
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-podium uppercase text-sm tracking-widest mx-8 flex-shrink-0" style={{ color: p.fgSub }}>
              {item} <span className="mx-2" style={{ color: p.border }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── MARCAS ───────────────────────────────────── */}
      <section id="marcas" className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16" style={secStyle}>
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-10">
            <p className="font-inter text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: p.fgSub }}>Nuestras marcas</p>
            <h2 className="font-podium uppercase leading-[0.92]" style={{ fontSize: 'clamp(2rem,5vw,3.8rem)', color: p.fg }}>
              Cinco marcas.<br />Un ecosistema.
            </h2>
          </RevealBlock>

          {/* Brand cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {BRANDS.map((b, i) => {
              const isActive = activeBrand === i
              return (
                <RevealBlock key={b.id} delay={i * 55}>
                  <button
                    onClick={() => setActiveBrand(isActive ? -1 : i)}
                    className="group relative w-full overflow-hidden focus:outline-none"
                    style={{ aspectRatio: '3/4' }}
                  >
                    <img src={b.img} alt={b.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)'
                    }} />
                    {/* Active border */}
                    <div className="absolute inset-0 border-2 transition-opacity duration-300 pointer-events-none"
                      style={{ borderColor: b.color, opacity: isActive ? 1 : 0 }} />
                    {/* Number */}
                    <div className="absolute top-4 left-4">
                      <span className="font-inter text-[10px] tracking-widest uppercase text-white/40">{b.num}</span>
                    </div>
                    {/* Active pip */}
                    {isActive && (
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ background: b.color }} />
                    )}
                    {/* Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {b.tags.map(t => (
                          <span key={t} className="font-inter text-[9px] tracking-widest uppercase px-2 py-0.5 border border-white/20 text-white/50 backdrop-blur-sm">{t}</span>
                        ))}
                      </div>
                      <h3 className="font-podium uppercase leading-tight mb-2 transition-colors duration-200"
                        style={{ fontSize: 'clamp(1.5rem,2.2vw,1.9rem)', color: isActive ? b.color : '#fff' }}>
                        {b.name}
                      </h3>
                      <p className="font-inter text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">{b.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-inter text-[10px] tracking-widest uppercase"
                          style={{ color: b.venues.length > 0 ? b.color : 'rgba(255,255,255,0.22)' }}>
                          {b.venues.length > 0 ? `${b.venues.length} salas` : 'Próximamente'}
                        </span>
                        <ChevronDown className="w-4 h-4 transition-transform duration-300"
                          style={{ color: b.color, transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                      </div>
                    </div>
                  </button>
                </RevealBlock>
              )
            })}
          </div>

          {/* Venue panel */}
          {brand && (
            <div className="mt-3 p-6 sm:p-8" style={{ background: p.bgPanel, borderTop: `2px solid ${brand.color}` }}>
              {brand.venues.length > 0 ? (
                <>
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-1 h-5 rounded-full" style={{ background: brand.color }} />
                    <p className="font-inter text-[10px] tracking-[0.3em] uppercase" style={{ color: p.fgMuted }}>
                      Discotecas by <span style={{ color: brand.color }}>@{brand.name.toLowerCase()}</span>
                    </p>
                    <span className="ml-auto font-inter text-[10px] tracking-widest uppercase" style={{ color: p.fgSub }}>
                      {brand.venues.length} salas
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                    {brand.venues.map(v => (
                      <a key={v.name} href={v.url} target="_blank" rel="noopener noreferrer"
                        className="group block p-4 transition-all duration-200"
                        style={{ border: `1px solid ${p.border}` }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = p.borderHover)}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = p.border)}>
                        <div className="h-0.5 mb-4 transition-all duration-200" style={{ width: '1.25rem', background: brand.color }} />
                        <div className="font-podium uppercase text-sm leading-tight mb-3" style={{ color: p.fg }}>{v.name}</div>
                        <div className="flex items-center gap-1 font-inter text-[10px] tracking-widest uppercase transition-colors" style={{ color: p.fgSub }}>
                          Entradas <ArrowUpRight className="w-3 h-3" />
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <p className="font-inter text-center text-xs tracking-[0.3em] uppercase py-10" style={{ color: p.fgSub }}>
                  Próximamente — {brand.name}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── RESEÑAS ──────────────────────────────────── */}
      <div id="resenas" style={altStyle}>
        <Reviews />
      </div>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer id="contacto" className="px-6 sm:px-10 lg:px-16 pt-16 pb-10"
        style={{ background: p.bgPanel, borderTop: `1px solid ${p.border}` }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 pb-12 mb-8"
            style={{ borderBottom: `1px solid ${p.border}` }}>
            <div>
              <div className="font-podium uppercase text-2xl tracking-widest mb-4" style={{ color: p.fg }}>
                ASGARD<span style={{ color: p.fgSub }}>.</span>EVENTS
              </div>
              <p className="font-inter text-sm leading-relaxed max-w-xs mb-6" style={{ color: p.fgMuted }}>
                Agencia y promotora de ocio en Madrid. Cinco marcas, un ecosistema, infinitas noches irrepetibles.
              </p>
              <div className="flex gap-2">
                {['IG', 'TK', 'YT', 'TW'].map(s => (
                  <button key={s} className="w-9 h-9 font-inter text-[10px] transition-all"
                    style={{ border: `1px solid ${p.border}`, color: p.fgSub }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-inter text-[9px] tracking-[0.25em] uppercase mb-5" style={{ color: p.fgSub }}>Marcas</p>
              <ul className="space-y-3">
                {BRANDS.map(b => (
                  <li key={b.id}>
                    <button
                      onClick={() => { document.getElementById('marcas')?.scrollIntoView({ behavior: 'smooth' }); setActiveBrand(BRANDS.indexOf(b)) }}
                      className="font-inter text-sm transition-colors text-left"
                      style={{ color: p.fgMuted }}>
                      {b.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-inter text-[9px] tracking-[0.25em] uppercase mb-5" style={{ color: p.fgSub }}>Contacto</p>
              <a href="mailto:hola@asgardevents.es" className="font-inter text-sm block mb-8 transition-colors" style={{ color: p.fgMuted }}>
                hola@asgardevents.es
              </a>
              <a href="mailto:hola@asgardevents.es"
                className="inline-flex items-center gap-2 px-5 py-3 font-inter text-xs font-semibold tracking-widest uppercase transition-colors"
                style={{ background: p.heroBtnBg, color: p.heroBtnFg }}>
                ESCRIBIRNOS <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="font-inter text-[11px] tracking-wider" style={{ color: p.fgSub }}>© 2026 Asgard Events · Madrid</p>
            <p className="font-inter text-[11px] tracking-wider" style={{ color: p.border }}>Cinco marcas. Un ecosistema.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up         { opacity:0; animation: fade-up 0.7s ease 0s    forwards; }
        .animate-fade-up-delay-1 { opacity:0; animation: fade-up 0.7s ease 0.18s forwards; }
      `}</style>
    </div>
  )
}
