export const kFormatter = (num: number): string => {
  return Math.abs(num) > 999
    ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + 'k'
    : (Math.sign(num) * Math.abs(num)).toString()
}
