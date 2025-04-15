import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";

export const getCreditCardConfig = ({ jokerCard, jokerCategory, style, valueType }: GetConfigParam): JokerConfig => {
  const CREDIT_CARD_METADATA: JokerMetadata = {
    price: 4,
    name: 'Credit Card',
    description: 'Go up to -$20 in debt',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class CreditCard extends jokerCard {
    constructor(game: Game) {
      super({
        game: game,
        ...CREDIT_CARD_METADATA,
      });
    }

    afterHandJokerCardsChangeHook() {
      this.game.jokerComputedData.setValue(data => ({ ...data, maxDebt: -20 }));
    }
  }
  return {
    creator: (game) => new CreditCard(game),
    metadata: CREDIT_CARD_METADATA,
  }
}
