import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
  Card,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";

export const getFacelessJokerConfig = ({ jokerCard, jokerCategory, style, cardLabels }: GetConfigParam): JokerConfig => {
  const FACELSS_JOKER_METADATA: JokerMetadata = {
    price: 4,
    name: 'Faceless Joker',
    description: 'Earn $5 if 3 or more face cards are discarded at the same time',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class FacelessJoker extends jokerCard {
    constructor(game: Game) {
      super({
        game: game,
        ...FACELSS_JOKER_METADATA,
      });
    }

    async afterDiscardHook(param: { cards: Card[]; }): Promise<void> {
      if (param.cards.filter(card => [cardLabels.J, cardLabels.Q, cardLabels.K].includes(card.label.value.label)).length >= 3) {
        this.game.money.setValue(money => money + 5);
        await this.emitEffect.emit();
      }
    }
  }
  return {
    creator: (game) => new FacelessJoker(game),
    metadata: FACELSS_JOKER_METADATA,
  }
}
