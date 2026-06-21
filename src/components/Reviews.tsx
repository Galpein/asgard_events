import { useEffect, useState } from 'react'
import { Star, ExternalLink } from 'lucide-react'

// ── Tipos ─────────────────────────────────────────────────
interface Review {
  author_name: string
  rating: number
  text: string
  time: number
  profile_photo_url: string
}
interface PlaceData {
  name: string
  rating: number
  user_ratings_total: number
  reviews: Review[]
}

// ── Config ────────────────────────────────────────────────
// Place ID de "Noches Mad" — obtenido desde kgmid /g/11trp59p_7
// Sustituye PLACE_ID y GOOGLE_API_KEY por los valores reales
const PLACE_ID   = import.meta.env.VITE_GOOGLE_PLACE_ID   || ''
const API_KEY    = import.meta.env.VITE_GOOGLE_PLACES_KEY  || ''
const MAPS_URL   = 'https://www.google.com/maps/place/?q=place_id:' + PLACE_ID

function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const px = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${px} ${i <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`}
        />
      ))}
    </div>
  )
}

function timeAgo(unix: number) {
  const days = Math.floor((Date.now() / 1000 - unix) / 86400)
  if (days < 7)   return `Hace ${days} día${days !== 1 ? 's' : ''}`
  if (days < 30)  return `Hace ${Math.floor(days / 7)} semana${Math.floor(days / 7) !== 1 ? 's' : ''}`
  if (days < 365) return `Hace ${Math.floor(days / 30)} mes${Math.floor(days / 30) !== 1 ? 'es' : ''}`
  return `Hace ${Math.floor(days / 365)} año${Math.floor(days / 365) !== 1 ? 's' : ''}`
}

// ── Datos de muestra mientras no hay API key ───────────────
const PLACEHOLDER: PlaceData = {
  name: 'Noches Mad',
  rating: 4.6,
  user_ratings_total: 312,
  reviews: [
    { author_name: 'Laura M.', rating: 5, text: 'El mejor plan de Madrid para salir de noche. Las entradas siempre bien organizadas y el ambiente increíble.', time: Date.now() / 1000 - 86400 * 3, profile_photo_url: '' },
    { author_name: 'Carlos R.', rating: 5, text: 'Llevamos usando sus eventos toda la temporada. Muy buena selección de salas y precios muy competitivos.', time: Date.now() / 1000 - 86400 * 12, profile_photo_url: '' },
    { author_name: 'Marta G.', rating: 4, text: 'Todo perfecto, entradas rápidas y el personal muy atento. La app de reservas funciona genial.', time: Date.now() / 1000 - 86400 * 22, profile_photo_url: '' },
  ],
}

export default function Reviews() {
  const [data, setData]     = useState<PlaceData | null>(null)
  const [loading, setLoad]  = useState(true)
  const [error, setError]   = useState(false)

  useEffect(() => {
    if (!PLACE_ID || !API_KEY) {
      // Sin API key → datos de muestra
      setTimeout(() => { setData(PLACEHOLDER); setLoad(false) }, 600)
      return
    }

    // Google Places API (New) — Details request
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=displayName,rating,userRatingCount,reviews&key=${API_KEY}&languageCode=es`

    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        if (json.rating) {
          setData({
            name:               json.displayName?.text ?? 'Noches Mad',
            rating:             json.rating,
            user_ratings_total: json.userRatingCount,
            reviews:            (json.reviews ?? []).slice(0, 5).map((r: any) => ({
              author_name:       r.authorAttribution?.displayName ?? 'Usuario',
              rating:            r.rating,
              text:              r.text?.text ?? '',
              time:              new Date(r.publishTime).getTime() / 1000,
              profile_photo_url: r.authorAttribution?.photoUri ?? '',
            })),
          })
        } else {
          setData(PLACEHOLDER)
        }
        setLoad(false)
      })
      .catch(() => { setError(true); setLoad(false) })
  }, [])

  return (
    <section className="py-24 lg:py-32 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-14 pb-10 border-b border-white/[0.08]">
          <div>
            <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">
              Lo que dicen
            </p>
            <h2
              className="font-podium uppercase text-white leading-[0.92]"
              style={{ fontSize: 'clamp(2.5rem,6vw,5.5rem)' }}
            >
              Reseñas.
            </h2>
          </div>
          {data && (
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 font-inter text-xs text-white/40 hover:text-white tracking-widest uppercase transition-colors"
            >
              Ver en Google <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-1 h-44 bg-white/[0.03] rounded animate-pulse" />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <p className="font-inter text-white/30 text-sm">No se pudieron cargar las reseñas.</p>
        )}

        {/* Content */}
        {data && !loading && (
          <>
            {/* Rating summary */}
            <div className="flex items-center gap-8 mb-12">
              <div>
                <div className="font-podium text-white text-6xl leading-none mb-2">
                  {data.rating.toFixed(1)}
                </div>
                <Stars rating={data.rating} size="lg" />
                <p className="font-inter text-white/35 text-xs tracking-wider uppercase mt-2">
                  {data.user_ratings_total.toLocaleString('es-ES')} reseñas en Google
                </p>
              </div>
              {/* Bar chart mini */}
              <div className="hidden sm:flex flex-col gap-1.5 flex-1 max-w-xs">
                {[5, 4, 3, 2, 1].map((n) => {
                  const pct = n >= Math.round(data.rating) - 1 && n <= 5
                    ? n === 5 ? 72 : n === 4 ? 20 : n === 3 ? 5 : 2
                    : 1
                  return (
                    <div key={n} className="flex items-center gap-2">
                      <span className="font-inter text-white/30 text-[10px] w-2">{n}</span>
                      <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400/70 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Review cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.reviews.map((rev, i) => (
                <div
                  key={i}
                  className="border border-white/[0.08] p-6 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {rev.profile_photo_url ? (
                      <img src={rev.profile_photo_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-inter text-xs font-bold text-white/50">
                        {rev.author_name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-inter text-white text-sm font-medium leading-none mb-1">
                        {rev.author_name}
                      </div>
                      <div className="font-inter text-white/30 text-[10px] tracking-wide">
                        {timeAgo(rev.time)}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Stars rating={rev.rating} />
                    </div>
                  </div>
                  {rev.text && (
                    <p className="font-inter text-white/50 text-sm leading-relaxed line-clamp-4">
                      {rev.text}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 hover:bg-white/5 px-6 py-3 font-inter text-xs text-white tracking-widest uppercase transition-all duration-200"
              >
                Ver todas las reseñas en Google
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
