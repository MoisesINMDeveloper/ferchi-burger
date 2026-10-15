const BCV_RATE_ENDPOINT = 'https://api.alcambio.app/graphql'

const BCV_USD_QUERY = `
  query BcvUsdRate {
    getCountryConversions(payload: { countryCode: "VE" }) {
      conversionRates {
        baseValue
        official
        type
        rateCurrency {
          code
        }
      }
      dateBcv
    }
  }
`

const bolivarFormatter = new Intl.NumberFormat('es-VE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const dateFormatter = new Intl.DateTimeFormat('es-VE', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'America/Caracas',
})

export async function fetchBcvUsdRate(signal) {
  const response = await fetch(BCV_RATE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: BCV_USD_QUERY }),
    signal,
  })

  if (!response.ok) {
    throw new Error(`Al Cambio respondió con estado ${response.status}`)
  }

  const result = await response.json()
  if (result.errors?.length) {
    throw new Error(result.errors.map(({ message }) => message).join('; '))
  }

  const conversion = result.data?.getCountryConversions
  const usdRate = conversion?.conversionRates?.find(
    ({ official, type, rateCurrency }) =>
      official && type === 'SECONDARY' && rateCurrency?.code === 'USD',
  )
  const value = usdRate?.baseValue
  const date = conversion?.dateBcv

  if (!Number.isFinite(value) || value <= 0 || !Number.isFinite(date)) {
    throw new Error('Al Cambio no devolvió una tasa oficial BCV válida para USD')
  }

  return { value, date }
}

export function formatBolivares(amount) {
  return `Bs. ${bolivarFormatter.format(amount)}`
}

export function formatBcvDate(timestamp) {
  return dateFormatter.format(new Date(timestamp))
}
