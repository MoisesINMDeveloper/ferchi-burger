import { ArrowLeft, Check, Clock3, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { formatBolivares } from '../data/exchangeRate.js'

const money = (value) => `$${value.toFixed(2)}`

function QuantityControl({ quantity, onChange, label }) {
  return (
    <div className="quantity-control" aria-label={`Cantidad de ${label}`}>
      <button
        type="button"
        aria-label={`Quitar una unidad de ${label}`}
        onClick={() => onChange(Math.max(0, quantity - 1))}
        disabled={quantity === 0}
      >
        <Minus size={16} />
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        aria-label={`Agregar una unidad de ${label}`}
        onClick={() => onChange(quantity + 1)}
      >
        <Plus size={16} />
      </button>
    </div>
  )
}

export default function ProductDetailModal({ product, quantityInCart, bcvRate, onClose, onConfirm }) {
  const [quantity, setQuantity] = useState(quantityInCart || 1)

  useEffect(() => {
    setQuantity(quantityInCart || 1)
  }, [product.id, quantityInCart])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleConfirm = () => {
    onConfirm(product, quantity)
    onClose()
  }

  return createPortal(
    <div className="product-modal-layer">
      <button
        type="button"
        aria-label="Cerrar detalles del producto"
        className="product-modal-backdrop"
        onClick={onClose}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
        className="product-detail-panel"
      >
        <button type="button" className="product-modal-back" onClick={onClose} aria-label="Volver al menú">
          <ArrowLeft size={19} />
          <span>Volver al menú</span>
        </button>
        <button type="button" className="product-modal-close" onClick={onClose} aria-label="Cerrar detalles">
          <X size={20} />
        </button>

        <div className="product-detail-scroll">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
            {product.badge && <span className="detail-badge">{product.badge}</span>}
          </div>

          <div className="product-detail-content">
            <p className="detail-category">{product.category}</p>
            <div className="detail-title-row">
              <h2 id="product-detail-title">{product.name}</h2>
              <span className="detail-price">
                {money(product.price)}
                {bcvRate.value && <small>{formatBolivares(product.price * bcvRate.value)}</small>}
              </span>
            </div>
            <p className="detail-description">{product.detail || product.description}</p>

            <div className="detail-facts">
              <span><ShoppingBag size={15} /> {product.portion}</span>
              <span><Clock3 size={15} /> Preparado al momento</span>
            </div>

            <div className="detail-ingredients">
              <h3>Hecho con</h3>
              <div className="ingredient-list">
                {product.ingredients?.map((ingredient) => (
                  <span key={ingredient}><Check size={12} /> {ingredient}</span>
                ))}
              </div>
              <p>¿Tienes alguna alergia o preferencia? Cuéntanoslo en la nota de tu pedido.</p>
            </div>
          </div>
        </div>

        <div className="product-detail-actions">
          <QuantityControl quantity={quantity} onChange={setQuantity} label={product.name} />
          <button
            type="button"
            className={`detail-confirm${quantity === 0 ? ' detail-remove' : ''}`}
            onClick={handleConfirm}
          >
            {quantity === 0
              ? 'Quitar del pedido'
              : `${quantityInCart ? 'Actualizar pedido' : 'Agregar al pedido'} · ${money(product.price * quantity)}`}
          </button>
        </div>
      </section>
    </div>,
    document.body,
  )
}
