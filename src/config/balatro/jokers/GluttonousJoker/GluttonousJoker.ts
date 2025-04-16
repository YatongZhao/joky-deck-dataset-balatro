import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
  Card,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";


export const getGluttonousJokerConfig = ({ jokerCard, jokerCategory, style, suits }: GetConfigParam): JokerConfig => {
  const GLUTTONOUS_JOKER_METADATA: JokerMetadata = {
    price: 5,
    name: 'Gluttonous Joker',
    description: 'Played cards with  Club suit give +3 Mult when scored',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class GluttonousJoker extends jokerCard {
    constructor(game: Game) {
      super({
        game: game,
        ...GLUTTONOUS_JOKER_METADATA,
      });
    }

    async afterCardHook(param: { card: Card }) {
      if (param.card.suit.value === suits.club) {
        this.game.round.value.handMultiFactor.setValue(factor => factor + 3);
        await this.emitEffect.emit();
      }
    }
  }
  return {
    creator: (game) => new GluttonousJoker(game),
    metadata: GLUTTONOUS_JOKER_METADATA,
  }
}
