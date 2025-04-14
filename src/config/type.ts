import type { JokerCard, JokerCategory, CardLabels } from "@yatongzhao/joky-deck-core";

export type GetConfigParam = {
  jokerCard: typeof JokerCard;
  jokerCategory: typeof JokerCategory;
  cardLabels: typeof CardLabels;
  style: 'flat' | 'joker';
}
