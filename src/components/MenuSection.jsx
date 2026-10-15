import { ArrowDownWideNarrow, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { categories, products } from '../data/products.js'
import { formatBolivares } from '../data/exchangeRate.js'
import ProductDetailModal from './ProductDetailModal.jsx'

function ProductCard({ product, bcvRate, onAdd, onOpenDetails }) {
  return (
    <article
      className="product-card group overflow-hidden rounded-[18px] border border-cocoa/[0.07] bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-soft"
      onClick={(event) => {
        if (!event.target.closest('button')) onOpenDetails(product)
      }}
    >
      <div className="product-image relative overflow-hidden bg-latte">
        <button
          type="button"
          className="product-image-trigger"
          aria-label={`Ver detalles de ${product.name}`}
          onClick={() => onOpenDetails(product)}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
          />
        </button>
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.11em] text-cocoa">
            {product.badge}
          </span>
        )}
      </div>
      <div className="product-info p-5">
        <div className="flex items-start justify-between gap-3">
          <h3>
            <button
              type="button"
              onClick={() => onOpenDetails(product)}
              className="product-name-button font-display text-[19px] leading-snug text-cocoa"
              aria-label={`Ver detalles de ${product.name}`}
            >
              {product.name}
            </button>
          </h3>
          <span className="product-card-price shrink-0 pt-1 text-sm font-bold text-cocoa">
            <span>${product.price.toFixed(2)}</span>
            {bcvRate.value && <small>{formatBolivares(product.price * bcvRate.value)}</small>}
          </span>
        </div>
        <p className="mt-2 min-h-[42px] text-[12px] leading-[1.7] text-cocoa/60">{product.description}</p>
        <button
          type="button"
          onClick={() => onAdd(product)}
          className="product-card-order mt-4"
        >
          Agregar pedido
        </button>
      </div>
    </article>
  )
}

export default function MenuSection({ branchId, bcvRate, onAdd, onSetQuantity, quantities, searchQuery }) {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [sortOrder, setSortOrder] = useState('featured')
  const [selectedProduct, setSelectedProduct] = useState(null)
  useEffect(() => {
    setActiveCategory('Todos')
    setSortOrder('featured')
    setSelectedProduct(null)
  }, [branchId])

  const normalizeText = (value) =>
    value.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const normalizedQuery = normalizeText(searchQuery.trim())
  const branchProducts = products.filter((product) => product.branchIds.includes(branchId))
  const branchCategories = categories.filter(
    (category) =>
      category === 'Todos' || branchProducts.some((product) => product.category === category),
  )
  const visibleProducts = branchProducts
    .filter((product) => {
      const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory
      const matchesSearch =
        !normalizedQuery ||
        normalizeText(
          `${product.name} ${product.description} ${product.detail} ${product.category} ${product.ingredients?.join(' ') || ''}`,
        ).includes(normalizedQuery)
      return matchesCategory && matchesSearch
    })
    .sort((first, second) => {
      if (sortOrder === 'price-asc') return first.price - second.price
      if (sortOrder === 'price-desc') return second.price - first.price
      return 0
    })

  return (
    <section id="menu" className="menu-section bg-cream px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="menu-heading">
          <div className="menu-intro">
            <p className="eyebrow">Plancha caliente. Cero vueltas.</p>
            <h2 className="section-title mt-4">El antojo manda.</h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-cocoa/65">
              Smash burgers, combos sin complicaciones y acompañantes hechos para compartir.
            </p>
          </div>
        </div>
        <div className="menu-toolbar">
          <div className="menu-filter-group">
            <div className="menu-filter-heading">
              <SlidersHorizontal size={14} aria-hidden="true" />
              <span>Explora por categoría</span>
              <span className="category-scroll-hint">Desliza para ver más</span>
            </div>
            <div className="category-list" role="group" aria-label="Filtrar por categoría">
              {branchCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`category-filter ${
                    activeCategory === category
                      ? 'is-active'
                      : ''
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="menu-results-bar">
            <p aria-live="polite">
              <strong>{visibleProducts.length}</strong> {visibleProducts.length === 1 ? 'producto' : 'productos'}
            </p>
            <label className="menu-sort">
              <ArrowDownWideNarrow size={15} aria-hidden="true" />
              <span className="menu-sort-copy">
                <span className="menu-sort-label">Ordenar por</span>
                <select
                  aria-label="Ordenar productos"
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                >
                  <option value="featured">Recomendados</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                </select>
              </span>
              <ChevronDown size={13} className="menu-sort-chevron" aria-hidden="true" />
            </label>
          </div>
        </div>
        <div className="product-grid mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.length > 0 ? visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              bcvRate={bcvRate}
              onAdd={onAdd}
              onOpenDetails={setSelectedProduct}
            />
          )) : (
            <p className="col-span-full rounded-2xl bg-surface px-5 py-10 text-center text-sm text-cocoa/60">
              No encontramos productos con ese nombre. Prueba otra búsqueda.
            </p>
          )}
        </div>
      </div>
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          quantityInCart={quantities[selectedProduct.id] || 0}
          bcvRate={bcvRate}
          onClose={() => setSelectedProduct(null)}
          onConfirm={onSetQuantity}
        />
      )}
    </section>
  )
}
