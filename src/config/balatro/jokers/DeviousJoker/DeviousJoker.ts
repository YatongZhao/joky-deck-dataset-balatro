import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";

export const getDeviousJokerConfig = ({ jokerCard, jokerCategory, style, valueType }: GetConfigParam): JokerConfig => {
  const DEVIous_JOKER_METADATA: JokerMetadata = {
    price: 4,
    name: 'Devious Joker',
    description: '+100 Chips if played hand contains a Straight',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class DeviousJoker extends jokerCard {
    constructor(game: Game) {
      super({
        game: game,
        ...DEVIous_JOKER_METADATA,
      });
    }

    async afterAllCardsEmitHook() {
      const handValue = this.game.round.value.selectedHandValue.value;
      if (handValue && (
          handValue.type === valueType.straight ||
          handValue.type === valueType.straightFlush
      )) {
          this.game.round.value.handChipsFactor.setValue(factor => factor + 100);
          await this.emitEffect.emit();
      }
  }
  }
  return {
    creator: (game) => new DeviousJoker(game),
    metadata: DEVIous_JOKER_METADATA,
  }
}
