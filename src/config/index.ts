import { getBalatroConfig } from './balatro'
import type { GetConfigParam } from '@yatongzhao/joky-deck-core'
const getConfig = ({ jokerCard, jokerCategory, cardLabels, valueType, style = 'joker' }: GetConfigParam) => {
  return {
    balatro: getBalatroConfig({ jokerCard, jokerCategory, style, cardLabels, valueType }),
  }
}

export {
  getConfig,
}
