import type { JokerCard, JokerCategory } from "@yatongzhao/joky-deck-core";

export type GetConfigParam = {
  jokerCard: typeof JokerCard;
  jokerCategory: typeof JokerCategory;
  style: 'flat' | 'joker';
}
