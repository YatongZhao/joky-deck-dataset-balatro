import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";

export const getCrazyJokerConfig = ({ jokerCard, jokerCategory, style, valueType }: GetConfigParam): JokerConfig => {
  const CRAZY_JOKER_METADATA: JokerMetadata = {
    price: 4,
    name: 'Crazy Joker',
    description: '+12 Mult if played hand contains a Straight',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class CrazyJoker extends jokerCard {
    constructor(game: Game) {
      super({
        game: game,
        ...CRAZY_JOKER_METADATA,
      });
    }

    async afterAllCardsEmitHook() {
      const handValue = this.game.round.value.selectedHandValue.value;
      if (handValue && (
        handValue.type === valueType.straight ||
        handValue.type === valueType.straightFlush
      )) {
        this.game.round.value.handMultiFactor.setValue(factor => factor + 12);
        await this.emitEffect.emit();
      }
    }
  }
  return {
    creator: (game) => new CrazyJoker(game),
    metadata: CRAZY_JOKER_METADATA,
  }
}
