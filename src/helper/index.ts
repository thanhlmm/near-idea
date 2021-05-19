import Big from 'big.js';

export const getNormalNear = (amount: number): number => {
  return Number(Big(amount).div(10 ** 24).toFixed())
}