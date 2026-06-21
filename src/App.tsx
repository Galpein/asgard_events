import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Crown, X, ChevronDown } from 'lucide-react'
import Reviews from './components/Reviews'

const VIDEO_URL = '/hero.mp4'

interface Venue { name: string; url: string }

const NAV_LINKS = [
  { label: 'Marcas',   href: '#marcas' },
  { label: 'Reseñas',  href: '#resenas' },
  { label: 'Contacto', href: '#contacto' },
]

const BRANDS = [
  {
    id: 'bellaqueo',
    num: '01',
    name: 'Bellaqueo',
    desc: 'Reggaeton, afrobeats y urbano sin límites. La fiesta que arrastra.',
    tags: ['Reggaeton', 'Urbano', 'Afrobeats'],
    color: '#FF3D6B',
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=700&q=80',
    venues: [] as Venue[],
  },
  {
    id: 'glass',
    num: '02',
    name: 'Glass',
    desc: 'La primera gran noche. Seguro, fresco y memorable.',
    tags: ['18-20', 'Primera noche'],
    color: '#38BDF8',
    img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=700&q=80',
    venues: [] as Venue[],
  },
  {
    id: 'nochesmad',
    num: '03',
    name: 'Nochesmad',
    desc: 'Madrid de noche como nunca la habías vivido.',
    tags: ['18-23', 'Gen Z', 'Madrid'],
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
    id: 'affair',
    num: '04',
    name: 'Affair',
    desc: 'Sofisticación, selección musical y ambiente premium.',
    tags: ['+24', 'Premium', 'Exclusivo'],
    color: '#FBBF24',
    img: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=700&q=80',
    venues: [] as Venue[],
  },
  {
    id: 'geek',
    num: '05',
    name: 'Gen Z Geek',
    desc: 'Pokémon TCG, One Piece, Magic. El coleccionismo como cultura.',
    tags: ['TCG', 'Pokémon', 'Gaming'],
    color: '#34D399',
    img: 'https://images.unsplash.com/photo-1606503153255-59d5e417b05b?auto=format&fit=crop&w=700&q=80',
    venues: [] as Venue[],
  },
]

const MARQUEE_ITEMS = ['Bellaqueo', 'Glass', 'Nochesmad', 'Affair', 'Gen Z Geek', 'Asgard Events', 'Madrid']

/* ── Reveal on scroll ────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function RevealBlock({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

/* ── App ─────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen]     = useState(false)
  const [activeBrand, setActiveBrand] = useState(-1)
  const [scrolled, setScrolled]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const brand = activeBrand >= 0 ? BRANDS[activeBrand] : null

  return (
    <div className="bg-[#0c0c0c] text-white overflow-x-hidden">

      {/* ── NAV ────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5 transition-all duration-400 ${
        scrolled ? 'bg-black/85 backdrop-blur-xl border-b border-white/[0.06]' : ''
      }`}>
        <a href="#" className="font-podium text-white uppercase text-xl tracking-wider">
          ASGARD<span className="text-white/30">.</span>EVENTS
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="font-inter text-sm text-white/60 tracking-widest uppercase hover:text-white transition-colors">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="mailto:hola@asgardevents.es"
          className="hidden md:flex items-center gap-2 border border-white/25 hover:border-white/60 hover:bg-white/5 px-5 py-2.5 text-xs text-white tracking-widest uppercase transition-all">
          CONTACTO <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <button className="md:hidden flex flex-col space-y-1.5" onClick={() => setMenuOpen(true)}>
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-4 h-0.5 bg-white" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[60] bg-black/97 backdrop-blur-sm transition-all duration-400 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col h-full px-6 py-6">
          <div className="flex items-center justify-between mb-14">
            <span className="font-podium text-white uppercase text-xl tracking-wider">ASGARD<span className="text-white/30">.</span>EVENTS</span>
            <button onClick={() => setMenuOpen(false)} className="text-white/50 hover:text-white transition-colors"><X className="w-7 h-7" /></button>
          </div>
          <div className="flex flex-col justify-center flex-1 gap-6">
            {NAV_LINKS.map(({ label, href }, i) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                className="font-podium text-white uppercase text-4xl transition-all duration-400"
                style={{ transitionDelay: `${i * 70 + 80}ms`, opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(16px)' }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: 'clamp(360px, 55vh, 600px)' }}>
        <video className="absolute inset-0 w-full h-full object-cover" src={VIDEO_URL} autoPlay muted loop playsInline />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#0c0c0c]" />
        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-20">
          <div className="flex items-center gap-2 mb-4 animate-fade-up">
            <Crown className="w-3.5 h-3.5 text-white/50" />
            <span className="font-inter text-[11px] text-white/50 tracking-[0.3em] uppercase">Madrid · Cinco Marcas · Un Ecosistema</span>
          </div>
          <h1 className="font-podium text-white uppercase leading-[0.9] animate-fade-up-delay-1" style={{ fontSize: 'clamp(2.6rem,7vw,6rem)' }}>
            Siente.<br />Vibra.<br />Madrid.
          </h1>
          <div className="flex gap-3 mt-8 animate-fade-up-delay-2">
            <a href="#marcas" className="flex items-center gap-2 bg-white text-black px-5 py-3 font-inter text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-colors">
              VER MARCAS <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a href="#contacto" className="flex items-center gap-2 border border-white/25 text-white px-5 py-3 font-inter text-xs tracking-widest uppercase hover:border-white/50 transition-colors">
              CONTACTO
            </a>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ────────────────────────────────── */}
      <div className="border-y border-white/[0.05] bg-[#0e0e0e] overflow-hidden py-3.5">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-podium text-white/35 uppercase text-sm tracking-widest mx-8 flex-shrink-0">
              {item} <span className="text-white/15 mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── MARCAS ─────────────────────────────────── */}
      <section id="marcas" className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <RevealBlock className="mb-10">
            <p className="font-inter text-[10px] tracking-[0.35em] uppercase text-white/35 mb-3">Nuestras marcas</p>
            <h2 className="font-podium uppercase text-white leading-[0.92]" style={{ fontSize: 'clamp(2rem,5vw,3.8rem)' }}>
              Cinco marcas.<br />Un ecosistema.
            </h2>
          </RevealBlock>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {BRANDS.map((b, i) => {
              const isActive = activeBrand === i
              return (
                <RevealBlock key={b.id} delay={i * 60}>
                  <button
                    onClick={() => setActiveBrand(isActive ? -1 : i)}
                    className="group relative w-full overflow-hidden focus:outline-none"
                    style={{ aspectRatio: '3/4' }}
                  >
                    {/* Image */}
                    <img
                      src={b.img} alt={b.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                    {/* Active border */}
                    <div
                      className="absolute inset-0 border-2 transition-opacity duration-300"
                      style={{ borderColor: b.color, opacity: isActive ? 1 : 0 }}
                    />

                    {/* Top-left number */}
                    <div className="absolute top-4 left-4">
                      <span className="font-inter text-[10px] tracking-widest uppercase text-white/40">{b.num}</span>
                    </div>

                    {/* Active dot top-right */}
                    {isActive && (
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ background: b.color }} />
                    )}

                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {b.tags.map(t => (
                          <span key={t}
                            className="font-inter text-[9px] tracking-widest uppercase px-2 py-0.5 border border-white/20 text-white/50 backdrop-blur-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                      {/* Name */}
                      <h3
                        className="font-podium uppercase leading-tight mb-2 transition-colors duration-200"
                        style={{
                          fontSize: 'clamp(1.5rem,2.2vw,1.9rem)',
                          color: isActive ? b.color : '#fff',
                        }}
                      >
                        {b.name}
                      </h3>
                      {/* Desc */}
                      <p className="font-inter text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">{b.desc}</p>
                      {/* CTA row */}
                      <div className="flex items-center justify-between">
                        <span
                          className="font-inter text-[10px] tracking-widest uppercase"
                          style={{ color: b.venues.length > 0 ? b.color : 'rgba(255,255,255,0.25)' }}
                        >
                          {b.venues.length > 0 ? `${b.venues.length} salas` : 'Próximamente'}
                        </span>
                        <ChevronDown
                          className="w-4 h-4 transition-transform duration-300"
                          style={{ color: b.color, transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      </div>
                    </div>
                  </button>
                </RevealBlock>
              )
            })}
          </div>

          {/* Venue expansion panel */}
          {brand && (
            <div
              className="mt-3 border-t-2 bg-white/[0.02] p-6 sm:p-8"
              style={{ borderColor: brand.color }}
            >
              {brand.venues.length > 0 ? (
                <>
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-1 h-5 rounded-full" style={{ background: brand.color }} />
                    <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/40">
                      Discotecas by{' '}
                      <span style={{ color: brand.color }}>@{brand.name.toLowerCase()}</span>
                    </p>
                    <span className="ml-auto font-inter text-[10px] text-white/20 tracking-widest uppercase">
                      {brand.venues.length} salas
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                    {brand.venues.map(v => (
                      <a key={v.name} href={v.url} target="_blank" rel="noopener noreferrer"
                        className="group block border border-white/[0.07] hover:border-white/20 p-4 transition-all duration-200 hover:bg-white/[0.03]"
                      >
                        <div
                          className="h-0.5 mb-4 transition-all duration-200"
                          style={{ width: '1.25rem', background: brand.color }}
                        />
                        <div className="font-podium text-white uppercase text-sm leading-tight mb-3 group-hover:text-white transition-colors">
                          {v.name}
                        </div>
                        <div className="flex items-center gap-1 font-inter text-[10px] tracking-widest uppercase text-white/30 group-hover:text-white/60 transition-colors">
                          Entradas <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <p className="font-inter text-center text-white/20 text-xs tracking-[0.3em] uppercase py-10">
                  Próximamente — Contenido de {brand.name} en camino
                </p>
              )}
            </div>
          )}

        </div>
      </section>

      {/* ── RESEÑAS ────────────────────────────────── */}
      <div id="resenas">
        <Reviews />
      </div>

      {/* ── FOOTER / CONTACTO ──────────────────────── */}
      <footer id="contacto" className="border-t border-white/[0.06] px-6 sm:px-10 lg:px-16 pt-16 pb-10 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 pb-14 border-b border-white/[0.06] mb-8">

            {/* Brand */}
            <div>
              <div className="font-podium text-white uppercase text-2xl tracking-widest mb-4">
                ASGARD<span className="text-white/25">.</span>EVENTS
              </div>
              <p className="font-inter text-white/30 text-sm leading-relaxed max-w-xs mb-6">
                Agencia y promotora de ocio en Madrid. Cinco marcas, un ecosistema, infinitas noches irrepetibles.
              </p>
              <div className="flex gap-2">
                {['IG', 'TK', 'YT', 'TW'].map(s => (
                  <button key={s} className="w-9 h-9 border border-white/[0.1] font-inter text-[10px] text-white/30 hover:border-white/30 hover:text-white/60 transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Marcas */}
            <div>
              <p className="font-inter text-[9px] tracking-[0.25em] uppercase text-white/25 mb-5">Marcas</p>
              <ul className="space-y-3">
                {BRANDS.map(b => (
                  <li key={b.id}>
                    <button
                      onClick={() => { document.getElementById('marcas')?.scrollIntoView({ behavior: 'smooth' }); setActiveBrand(BRANDS.indexOf(b)) }}
                      className="font-inter text-sm text-white/35 hover:text-white transition-colors text-left"
                      style={{ ':hover': { color: b.color } } as React.CSSProperties}
                    >
                      {b.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <p className="font-inter text-[9px] tracking-[0.25em] uppercase text-white/25 mb-5">Contacto</p>
              <ul className="space-y-3 mb-8">
                <li>
                  <a href="mailto:hola@asgardevents.es" className="font-inter text-sm text-white/35 hover:text-white transition-colors">
                    hola@asgardevents.es
                  </a>
                </li>
              </ul>
              <a href="mailto:hola@asgardevents.es"
                className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 font-inter text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-colors">
                ESCRIBIRNOS <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="font-inter text-white/15 text-[11px] tracking-wider">© 2026 Asgard Events · Madrid</p>
            <p className="font-inter text-white/10 text-[11px] tracking-wider">Cinco marcas. Un ecosistema.</p>
          </div>
        </div>
      </footer>

      {/* ── Keyframes ──────────────────────────────── */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up          { opacity:0; animation: fade-up 0.7s ease 0s   forwards; }
        .animate-fade-up-delay-1  { opacity:0; animation: fade-up 0.7s ease 0.18s forwards; }
        .animate-fade-up-delay-2  { opacity:0; animation: fade-up 0.7s ease 0.34s forwards; }
      `}</style>
    </div>
  )
}
