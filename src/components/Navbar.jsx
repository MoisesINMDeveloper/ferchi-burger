import { Search, ShoppingBag } from 'lucide-react'
import BrandLogo from './BrandLogo.jsx'
import BranchSelector from './BranchSelector.jsx'

export default function Navbar({ branchId, onChangeBranch, cartCount, onOpenCart, onSearch }) {
  return (
    <header className="app-header fixed inset-x-0 top-0 z-40 border-b border-cocoa/5 bg-cream/85 backdrop-blur-lg">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-7xl flex-col justify-center gap-2 px-4 py-3 sm:px-8 md:h-[76px] md:flex-row md:items-center md:justify-between         md:gap-0 md:py-0"
      >
        <div className="flex items-center justify-between">
          <a href="#inicio" className="group flex items-center gap-3" aria-label="Ferchi Burger, inicio">
            <BrandLogo className="w-[112px] transition-transform duration-200 group-hover:scale-[1.02] md:w-[176px]" />
          </a>

          <BranchSelector
            value={branchId}
            onChange={onChangeBranch}
            className="branch-selector-mobile"
          />

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Abrir carrito, ${cartCount} productos`}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-cocoa/10 bg-white/70 text-cocoa transition hover:border-cocoa hover:bg-white md:hidden"
          >
            <ShoppingBag size={18} strokeWidth={1.7} />
            <span className="absolute -right-1 -top-1 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-caramel px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </button>
        </div>

        <label className="mobile-search md:hidden">
          <Search size={17} className="shrink-0 text-cocoa/45" />
          <input
            type="search"
            onChange={(event) => onSearch(event.target.value)}
            placeholder="¿Qué te vas a comer hoy?"
            aria-label="Buscar productos"
          />
          <span className="search-shortcut">⌕</span>
        </label>

        <div className="hidden items-center justify-center gap-8 md:flex md:gap-9">
          <a className="nav-link" href="#menu">Menú</a>
          <a className="nav-link" href="#nosotros">La actitud</a>
          <a className="nav-link" href="#contacto">Encuéntranos</a>
        </div>

        <BranchSelector
          value={branchId}
          onChange={onChangeBranch}
          className="branch-selector-desktop"
        />

        <button
          type="button"
          onClick={onOpenCart}
          aria-label={`Abrir carrito, ${cartCount} productos`}
          className="relative hidden h-11 w-11 items-center justify-center rounded-full border border-cocoa/10 bg-white/70 text-cocoa transition hover:border-cocoa hover:bg-white md:inline-flex"
        >
          <ShoppingBag size={19} strokeWidth={1.7} />
          <span className="absolute -right-1 -top-1 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-caramel px-1 text-[10px] font-bold text-white">
            {cartCount}
          </span>
        </button>
      </nav>
    </header>
  )
}
