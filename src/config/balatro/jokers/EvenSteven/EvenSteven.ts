import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
  Card,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";


export const getEvenStevenConfig = ({ jokerCard, jokerCategory, style, cardLabels }: GetConfigParam): JokerConfig => {
  const EVEN_STEVEN_METADATA: JokerMetadata = {
    price: 4,
    name: 'Even Steven',
    description: 'Played cards with even rank give +4 Mult when scored (10, 8, 6, 4, 2)', // （10、8、6、4、2）
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class EvenSteven extends jokerCard {
    constructor(game: Game) {
      super({
        game: game,
        ...EVEN_STEVEN_METADATA,
      });
    }

    async afterCardHook(param: { card: Card }) {
      if ([cardLabels.n2, cardLabels.n4, cardLabels.n6, cardLabels.n8, cardLabels.n10].includes(param.card.label.value.label)) {
        this.game.round.value.handMultiFactor.setValue(factor => factor + 4);
        await this.emitEffect.emit();
      }
    }
  }
  return {
    creator: (game) => new EvenSteven(game),
    metadata: EVEN_STEVEN_METADATA,
  }
}
