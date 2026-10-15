import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getWhatsAppUrl } from '../data/contact.js'
import { formatBcvDate, formatBolivares } from '../data/exchangeRate.js'

const money = (value) => `$${value.toFixed(2)}`

export default function CartDrawer({ isOpen, onClose, cart, onChangeQuantity, onRemove, total, branchName, bcvRate }) {
  const [deliveryNote, setDeliveryNote] = useState('')
  const moneyInBolivares = (amount) =>
    bcvRate.value ? formatBolivares(amount * bcvRate.value) : null
  const formatPrice = (amount) => {
    const bolivares = moneyInBolivares(amount)
    return bolivares ? `${money(amount)} / ${bolivares}` : money(amount)
  }

  useEffect(() => {
    if (!isOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const checkout = () => {
    if (cart.length === 0) return

    const lines = cart.map(
      ({ product, quantity }) =>
        `- ${quantity}x ${product.name} = ${formatPrice(product.price * quantity)}`,
    )
    const message = [
      `¡Hola, Ferchi Burger! 🍔 Quiero hacer un pedido para ${branchName.toLowerCase()}:`,
      '',
      ...lines,
      '-------------------',
      `💰 Total a pagar: ${formatPrice(total)}`,
      ...(bcvRate.value
        ? [`Tasa BCV: 1 USD = ${formatBolivares(bcvRate.value)} · ${formatBcvDate(bcvRate.date)} · Al Cambio${bcvRate.status === 'error' ? ' (última tasa disponible)' : ''}`]
        : []),
      `📍 Dirección / Nota: ${deliveryNote.trim() || 'Por confirmar'}`,
      '¡Quedo atento/a!',
    ].join('\n')

    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-cocoa/45 backdrop-blur-[2px]"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="drawer-panel absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-surface shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-cocoa/10 px-6 py-5">
          <div>
            <p className="eyebrow text-[9px]">Tu selección</p>
            <h2 id="cart-title" className="mt-1 font-display text-[26px] text-cocoa">Tu pedido</h2>
            <p className="mt-1 text-[11px] font-semibold text-caramel">Pedir como: {branchName}</p>
          </div>
          <button
            type="button"
            aria-label="Cerrar carrito"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-latte"
          >
            <X size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-latte text-cocoa">
              <ShoppingBag size={28} strokeWidth={1.4} />
            </span>
            <h3 className="mt-6 font-display text-2xl text-cocoa">Todavía está vacío</h3>
            <p className="mt-2 text-sm leading-6 text-cocoa/60">La plancha está lista. Encuentra tu próxima smash en el menú.</p>
            <button type="button" onClick={onClose} className="mt-6 rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-white hover:bg-caramel">
              Explorar el menú
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 border-b border-cocoa/10 pb-5">
                  <img src={product.image} alt="" className="h-[82px] w-[82px] rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <h3 className="font-display text-[16px] leading-snug text-cocoa">{product.name}</h3>
                      <span className="cart-item-total shrink-0 text-sm font-bold text-cocoa">
                        {money(product.price * quantity)}
                        {moneyInBolivares(product.price * quantity) && (
                          <small>{moneyInBolivares(product.price * quantity)}</small>
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-cocoa/55">
                      {money(product.price)} por unidad
                      {moneyInBolivares(product.price) && ` · ${moneyInBolivares(product.price)} c/u`}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex h-8 items-center rounded-full border border-cocoa/15">
                        <button
                          type="button"
                          aria-label={`Disminuir cantidad de ${product.name}`}
                          onClick={() => onChangeQuantity(product.id, quantity - 1)}
                          className="px-2.5 text-cocoa/70 hover:text-caramel"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="min-w-5 text-center text-xs font-semibold">{quantity}</span>
                        <button
                          type="button"
                          aria-label={`Aumentar cantidad de ${product.name}`}
                          onClick={() => onChangeQuantity(product.id, quantity + 1)}
                          className="px-2.5 text-cocoa/70 hover:text-caramel"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Eliminar ${product.name}`}
                        onClick={() => onRemove(product.id)}
                        className="flex items-center gap-1 text-[11px] text-cocoa/50 transition hover:text-red-700"
                      >
                        <Trash2 size={13} /> Quitar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-cocoa/10 bg-surface px-6 pb-7 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-cocoa/65">Total del pedido</span>
                <span className="cart-order-total font-display text-2xl font-semibold text-cocoa">
                  {money(total)}
                  {moneyInBolivares(total) && <small>{moneyInBolivares(total)}</small>}
                </span>
              </div>
              <p className={`cart-rate-note${bcvRate.status === 'error' ? ' is-error' : ''}`} role="status">
                {bcvRate.value
                  ? `1 USD = ${formatBolivares(bcvRate.value)} · BCV ${formatBcvDate(bcvRate.date)}${bcvRate.status === 'error' ? ' · tasa anterior' : ''}`
                  : bcvRate.status === 'loading'
                    ? 'Consultando tasa BCV…'
                    : 'Tasa BCV no disponible; total expresado en USD.'}{' '}
                <a href="https://alcambio.app/" target="_blank" rel="noreferrer">Al Cambio</a>
              </p>
              <label htmlFor="delivery-note" className="mt-4 block text-[11px] font-semibold text-cocoa/70">
                Dirección de delivery o nota
              </label>
              <textarea
                id="delivery-note"
                value={deliveryNote}
                onChange={(event) => setDeliveryNote(event.target.value)}
                placeholder="Escribe tu dirección o alguna indicación"
                rows={2}
                className="mt-2 w-full resize-none rounded-xl border border-cocoa/15 bg-cream px-3 py-2.5 text-xs text-cocoa outline-none placeholder:text-cocoa/40 focus:border-caramel"
              />
              <p className="mt-2 text-[11px] leading-5 text-cocoa/50">El costo de delivery se confirma por WhatsApp.</p>
              <button
                type="button"
                onClick={checkout}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-caramel px-5 py-4 text-sm font-semibold text-white transition hover:bg-taupe"
              >
                Finalizar pedido por WhatsApp
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
