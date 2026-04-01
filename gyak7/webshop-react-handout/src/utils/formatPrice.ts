export function formatPrice(price: number): string {
  return new Intl.NumberFormat('hu-HU').format(price) + ' Ft';
}
