/** price = 실제 판매가(할인가). 정가를 역산해 프로모션 표시용 데이터 반환 */
export function calcPromo(price: number) {
  const raw = price / 0.8                          // 20% 할인 기준
  const unit = price >= 10_000 ? 500 : 100
  const original = Math.ceil(raw / unit) * unit    // 500원 단위로 올림
  const rate = Math.round((1 - price / original) * 100)
  return { original, sale: price, rate }
}
