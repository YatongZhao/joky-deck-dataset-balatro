import type { Game, JokerMetadata, JokerConfig, Card, GetConfigParam } from "@yatongzhao/joky-deck-core";
import flatJokerImage from './flat.png'
import jokerJokerImage from './joker.png'
import { randomByChance } from "../../../../utils/random";

export const getBusinessCardConfig = ({ jokerCard, jokerCategory, style, cardLabels }: GetConfigParam): JokerConfig => {
  const BUSINESS_CARD_METADATA: JokerMetadata = {
    price: 4,
    name: 'Business Card',
    description: 'Played face cards have a 1 in 2 chance to give $2 when scored',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class BusinessCard extends jokerCard {
    constructor(game: Game) {
      super({
        game,
        ...BUSINESS_CARD_METADATA,
      });
    }
  
    async afterCardHook(param: { card: Card }) {
      if ([cardLabels.J, cardLabels.Q, cardLabels.K].includes(param.card.label.value.label)) {
        if (randomByChance(0.5)) {
          this.game.money.setValue(money => money + 2);
          await this.emitEffect.emit();
        }
      }
    }
  }

  return {
    creator: (game) => new BusinessCard(game),
    metadata: BUSINESS_CARD_METADATA,
  }
}

