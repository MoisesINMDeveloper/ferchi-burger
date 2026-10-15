import { Instagram, MapPin, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '../data/contact.js'
import BrandLogo from './BrandLogo.jsx'

export default function Footer() {
  return (
    <>
      <section id="nosotros" className="bg-cream px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[28px] bg-cocoa px-7 py-10 text-cream sm:px-12 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brass">No es solo una hamburguesa</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Es ese primer mordisco que lo cambia todo.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
              Carne aplastada en plancha caliente, ingredientes sin atajos y una buena dosis de actitud. Ven con hambre; nosotros ponemos lo demás.
            </p>
          </div>
          <a href="#menu" className="inline-flex w-fit items-center gap-3 rounded-full bg-cream px-6 py-3.5 text-sm font-semibold text-cocoa transition hover:bg-brass">
            Arma tu pedido <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer id="contacto" className="border-t border-cocoa/10 bg-cream px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <a href="#inicio" aria-label="Ferchi Burger, inicio">
              <BrandLogo className="w-[178px]" />
            </a>
            <p className="mt-3 max-w-xs text-xs leading-6 text-cocoa/60">Smash burgers con carácter. Cero vueltas, puro sabor.</p>
          </div>
          <div>
            <h3 className="footer-heading">Cómo pedir</h3>
            <div className="mt-4 space-y-3 text-xs leading-5 text-cocoa/65">
              <p className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-caramel" />
                <span><strong className="font-semibold text-cocoa">Retiro en local</strong><br />Dirección por confirmar</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-caramel" />
                <span><strong className="font-semibold text-cocoa">Delivery</strong><br />Consulta zonas de cobertura</span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="footer-heading">Horario</h3>
            <p className="mt-4 text-xs leading-6 text-cocoa/65">Horario por confirmar.<br />Pregúntanos por WhatsApp.</p>
          </div>
          <div>
            <h3 className="footer-heading">Síguenos</h3>
            <div className="mt-4 flex gap-3">
              <span title="Usuario de Instagram por confirmar" className="social-icon"><Instagram size={17} /></span>
              <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="social-icon"><MessageCircle size={17} /></a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-cocoa/10 pt-5 text-[10px] text-cocoa/50">
          © {new Date().getFullYear()} Ferchi Burger. Smash fresh. Come happy.
        </div>
      </footer>
    </>
  )
}
