import { ArrowDown, ArrowUpRight, Clock3, Pause, Play, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { products } from '../data/products.js'

const featuredSlidesByBranch = {
  pickup: [
  {
    productId: 'ferchi-smash',
    eyebrow: 'El golpe de sabor',
    badge: 'La de la casa',
    title: <>Smash hecho<br /><em>como debe ser.</em></>,
    note: 'Doble carne · queso · salsa Ferchi',
  },
  {
    productId: 'doble-ferchi',
    eyebrow: 'Hoy no se comparte',
    badge: 'Más pedida',
    title: <>Doble queso.<br /><em>Cero drama.</em></>,
    note: 'Doble smash · cheddar · bacon',
  },
  {
    productId: 'crispy-chicken',
    eyebrow: 'Cruje desde el primer bite',
    badge: 'Pollo crispy',
    title: <>El lado<br /><em>crunchy.</em></>,
    note: 'Pollo crocante · slaw · mayo cítrica',
  },
  {
    productId: 'papas-ferchi',
    eyebrow: 'Las papas no son extra',
    badge: 'Para compartir',
    title: <>Que sobren<br /><em>solo migas.</em></>,
    note: 'Papas · parmesano · salsa Ferchi',
  },
  ],
  delivery: [
    {
      productId: 'combo-ferchi',
      eyebrow: 'Tu plan ya está resuelto',
      badge: 'Combo favorito',
      title: <>La smash que<br /><em>llega contigo.</em></>,
      note: 'Ferchi Smash · papas · bebida',
    },
    {
      productId: 'nuggets',
      eyebrow: 'Un crunch bien serio',
      badge: 'Para dipear',
      title: <>Uno más<br /><em>y ya.</em></>,
      note: 'Nuggets dorados · dos salsas',
    },
  ],
}

const productById = new Map(products.map((product) => [product.id, product]))
Object.keys(featuredSlidesByBranch).forEach((branchId) => {
  featuredSlidesByBranch[branchId] = featuredSlidesByBranch[branchId].map((slide) => {
    const product = productById.get(slide.productId)
    return { ...slide, id: slide.productId, image: product.image, alt: product.name }
  })
})

function FeaturedImage({ slide, mobile = false, branchName }) {
  return (
    <div className={`featured-image${mobile ? ' featured-image-mobile' : ''}`}>
      <img src={slide.image} alt={slide.alt} />
      <div className="featured-image-shade" />
      <div className="featured-copy">
        <span className="featured-badge">
          {mobile ? <Sparkles size={11} /> : <span className="featured-spark">✦</span>}
          {slide.badge}
        </span>
        <p className="featured-eyebrow">{slide.eyebrow}</p>
        <h2>{slide.title}</h2>
        <p className="featured-note">{mobile && <Clock3 size={12} />}{slide.note}</p>
        <a href="#menu" className="featured-link">
          Explorar el menú <ArrowUpRight size={mobile ? 14 : 16} />
        </a>
      </div>
    </div>
  )
}

function CarouselControls({ slides, activeIndex, onSelect, paused, onTogglePause, variant }) {
  return (
    <div className={`carousel-controls carousel-controls-${variant}`}>
      <div className="carousel-dots" role="group" aria-label="Elegir demostración">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Ver demostración ${index + 1}: ${slide.eyebrow}`}
            aria-pressed={activeIndex === index}
            className={activeIndex === index ? 'carousel-dot is-active' : 'carousel-dot'}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
      <button
        type="button"
        className="carousel-pause"
        aria-label={paused ? 'Reanudar carrusel automático' : 'Pausar carrusel automático'}
        onClick={onTogglePause}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
      </button>
    </div>
  )
}

export default function Hero({ branchId, branchName }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const touchStartX = useRef(null)
  const slides = featuredSlidesByBranch[branchId] || featuredSlidesByBranch.pickup
  const slide = slides[activeIndex % slides.length]
  const paused = isHovered || hasFocus || userPaused

  useEffect(() => {
    setActiveIndex(0)
  }, [branchId])

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [branchId, paused, slides.length])

  const goTo = (index) => setActiveIndex((index + slides.length) % slides.length)
  const previous = () => goTo(activeIndex - 1)
  const next = () => goTo(activeIndex + 1)
  const toggleRotation = () => {
    setUserPaused((value) => !value)
    setIsHovered(false)
    setHasFocus(false)
  }

  return (
    <section
      id="inicio"
      role="region"
      aria-label="Favoritos Ferchi Burger"
      className="relative isolate overflow-hidden bg-cream pt-[118px] md:pt-[76px]"
      aria-roledescription="carrusel de productos destacados"
    >
      <div
        className="mobile-promo mx-4 mt-3 overflow-hidden rounded-[22px] bg-cocoa text-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false)
        }}
        onTouchStart={(event) => { touchStartX.current = event.changedTouches[0].clientX }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return
          const distance = event.changedTouches[0].clientX - touchStartX.current
          if (Math.abs(distance) > 45) (distance > 0 ? previous : next)()
          touchStartX.current = null
        }}
        aria-live={paused ? 'polite' : 'off'}
      >
        <FeaturedImage slide={slide} mobile branchName={branchName} />
        <div className="mobile-promo-footer">
          <span>{branchName} · pedido Ferchi</span>
          <CarouselControls
            slides={slides}
            activeIndex={activeIndex}
            onSelect={goTo}
            paused={paused}
            onTogglePause={toggleRotation}
            variant="mobile"
          />
        </div>
      </div>
      <div className="absolute -left-36 top-36 -z-10 h-96 w-96 rounded-full bg-brass/20 blur-3xl" />
      <div className="mx-auto grid min-h-[690px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.93fr_1.07fr] lg:gap-12 lg:py-20">
        <div className="desktop-hero-copy relative z-10 max-w-xl py-8">
          <p className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-caramel">
            <span className="h-px w-8 bg-caramel" />
            SMASHED FRESH · HECHO AL MOMENTO
          </p>
          <h1 className="font-display text-[clamp(3.35rem,7.1vw,6.3rem)] leading-[0.99] tracking-[-0.045em] text-cocoa">
            Dale un
            <br />
            <span className="italic text-caramel">mordisco</span> al día.
          </h1>
          <p className="mt-7 max-w-md text-[15px] leading-7 text-cocoa/70 sm:text-base">
            Bordes crujientes, queso fundido y salsas hechas en casa. La buena comida no necesita mucha explicación.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a href="#menu" className="inline-flex h-13 items-center gap-3 rounded-full bg-cocoa px-7 py-4 text-sm font-semibold text-white transition hover:bg-caramel">
              Arma tu pedido <ArrowUpRight size={17} />
            </a>
            <a href="#nosotros" className="text-sm font-semibold text-cocoa/70 transition hover:text-caramel">
              Conoce Ferchi
            </a>
          </div>
          <div className="mt-16 flex items-center gap-4 border-t border-cocoa/10 pt-5 text-xs text-cocoa/60">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cocoa/15">
              <ArrowDown size={15} />
            </span>
            La plancha está caliente. Tú decides.
          </div>
        </div>

        <div
          className="desktop-feature"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setHasFocus(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false)
          }}
          onTouchStart={(event) => { touchStartX.current = event.changedTouches[0].clientX }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return
            const distance = event.changedTouches[0].clientX - touchStartX.current
            if (Math.abs(distance) > 45) (distance > 0 ? previous : next)()
            touchStartX.current = null
          }}
        >
          <FeaturedImage slide={slide} branchName={branchName} />
          <CarouselControls
            slides={slides}
            activeIndex={activeIndex}
            onSelect={goTo}
            paused={paused}
            onTogglePause={toggleRotation}
            variant="desktop"
          />
          <span className="featured-slide-count">{String((activeIndex % slides.length) + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  )
}
