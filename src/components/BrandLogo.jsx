export default function BrandLogo({ className = '' }) {
  return (
    <span className={`brand-logo-frame ${className}`} role="img" aria-label="Ferchi Burger">
      <svg className="brand-logo-mark" viewBox="0 0 52 52" aria-hidden="true">
        <rect width="52" height="52" rx="16" fill="currentColor" />
        <path d="M11 22a15 15 0 0 1 30 0H11Z" fill="#D4EE4A" />
        <path d="M12 25h28v4H12z" fill="#F2EDDF" />
        <path d="m12 31 5-2 4 2 5-2 5 2 4-2 5 2v3H12z" fill="#EB633D" />
        <path d="M13 36h26v2a7 7 0 0 1-7 7H20a7 7 0 0 1-7-7v-2Z" fill="#D4EE4A" />
        <circle cx="21" cy="17" r="1" fill="#142531" />
        <circle cx="27" cy="14" r="1" fill="#142531" />
        <circle cx="33" cy="17" r="1" fill="#142531" />
      </svg>
      <span className="brand-logo-wordmark">
        <strong>FERCHI</strong>
        <small>BURGER CLUB</small>
      </span>
    </span>
  )
}
