import type { JokerCard, JokerCategory } from '@yatongzhao/joky-deck-core'
import { getBalatroConfig } from './balatro'

const getConfig = (jokerCard: typeof JokerCard, jokerCategory: typeof JokerCategory) => {
  return {
    balatro: getBalatroConfig(jokerCard, jokerCategory),
  }
}

export {
  getConfig,
}
