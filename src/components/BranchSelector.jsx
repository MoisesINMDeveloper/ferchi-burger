import { ChevronDown, MapPin } from 'lucide-react'
import { branches } from '../data/products.js'

export default function BranchSelector({ value, onChange, className = '' }) {
  return (
    <label className={`branch-selector ${className}`}>
      <MapPin size={17} className="branch-selector-pin" aria-hidden="true" />
      <span className="branch-selector-copy">
        <span className="branch-selector-label">PEDIR COMO</span>
        <select
            aria-label="Elegir modalidad del pedido"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>{branch.name}</option>
          ))}
        </select>
      </span>
      <ChevronDown size={14} className="branch-selector-chevron" aria-hidden="true" />
    </label>
  )
}
