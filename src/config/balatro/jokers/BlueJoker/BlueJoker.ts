import type { Game, JokerMetadata, JokerConfig } from "@yatongzhao/joky-deck-core";
import type { GetConfigParam } from '../../../type'
import flatJokerImage from './flat.png'
import jokerJokerImage from './joker.png'

export const getBlueJokerConfig = ({ jokerCard, jokerCategory, style }: GetConfigParam): JokerConfig => {
  const BLUE_JOKER_METADATA: JokerMetadata = {
    price: 5,
    name: 'Blue Joker',
    description: '+2 Chips for each remaining card in the deck',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class BlueJoker extends jokerCard {
    constructor(game: Game) {
      super({
        game,
        ...BLUE_JOKER_METADATA,
      });
    }

    async afterAllCardsEmitHook() {
      this.game.round.value.handChipsFactor.setValue(factor => factor + 2 * this.game.round.value.cardPool.value.length);
      await this.emitEffect.emit();
    }
  }

  return {
    creator: (game) => new BlueJoker(game),
    metadata: BLUE_JOKER_METADATA,
  }
}
