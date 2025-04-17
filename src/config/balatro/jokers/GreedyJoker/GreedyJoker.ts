import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
  Card,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";

export const getGreedyJokerConfig = ({ jokerCard, jokerCategory, style, suits }: GetConfigParam): JokerConfig => {
  const GREEDY_JOKER_METADATA: JokerMetadata = {
    price: 5,
    name: 'Greedy Joker',
    description: 'Played cards with  Diamond suit give +3 Mult when scored',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class GreedyJoker extends jokerCard {
    constructor(game: Game) {
      super({
        game: game,
        ...GREEDY_JOKER_METADATA,
      });
    }

    async afterCardHook(param: { card: Card }) {
      if (param.card.suit.value === suits.diamond) {
        this.game.round.value.handMultiFactor.setValue(factor => factor + 3);
        await this.emitEffect.emit();
      }
    }
  }
  return {
    creator: (game) => new GreedyJoker(game),
    metadata: GREEDY_JOKER_METADATA,
  }
}
