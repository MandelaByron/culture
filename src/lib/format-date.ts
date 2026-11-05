/** Format an ISO date (YYYY-MM-DD) for display. UTC avoids SSR/CSR mismatch. */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
