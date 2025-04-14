import type { JokerCard, JokerCategory } from '@yatongzhao/joky-deck-core'
import { getAbstractJokerConfig } from './jokers/AbstractJoker/AbstractJoker'

export const getBalatroConfig = (jokerCard: typeof JokerCard, jokerCategory: typeof JokerCategory) => {
  return {
    jokers: [
      getAbstractJokerConfig(jokerCard, jokerCategory),
    ],
  }
}
