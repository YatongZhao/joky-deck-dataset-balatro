import type { CardLabels, JokerCard, JokerCategory } from '@yatongzhao/joky-deck-core'
import { getBalatroConfig } from './balatro'

const style = 'joker';
const getConfig = ({ jokerCard, jokerCategory, cardLabels }: {
  jokerCard: typeof JokerCard;
  jokerCategory: typeof JokerCategory;
  cardLabels: typeof CardLabels;
}) => {
  return {
    balatro: getBalatroConfig({ jokerCard, jokerCategory, style, cardLabels }),
  }
}

export {
  getConfig,
}
