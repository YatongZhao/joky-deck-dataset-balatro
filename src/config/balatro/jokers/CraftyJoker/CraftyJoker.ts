import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";

export const getCraftyJokerConfig = ({ jokerCard, jokerCategory, style, valueType }: GetConfigParam): JokerConfig => {
  const CRAFTY_JOKER_METADATA: JokerMetadata = {
    price: 4,
    name: 'Crafty Joker',
    description: '+80 Chips if played hand contains a Flush',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class CraftyJoker extends jokerCard {
    constructor(game: Game) {
      super({
        game: game,
        ...CRAFTY_JOKER_METADATA,
      });
    }

    async afterAllCardsEmitHook() {
      const handValue = this.game.round.value.selectedHandValue.value;
      if (
        handValue &&
        (handValue.type === valueType.flush ||
          handValue.type === valueType.straightFlush)
      ) {
        this.game.round.value.handChipsFactor.setValue((factor) => factor + 80);
        await this.emitEffect.emit();
      }
    }
  }
  return {
    creator: (game) => new CraftyJoker(game),
    metadata: CRAFTY_JOKER_METADATA,
  }
}
