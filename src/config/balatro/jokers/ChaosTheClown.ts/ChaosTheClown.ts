import type { Game, JokerMetadata, JokerConfig } from "@yatongzhao/joky-deck-core";
import type { GetConfigParam } from '../../../type'
import flatJokerImage from './flat.png'
import jokerJokerImage from './joker.png'

export const getChaosTheClownConfig = ({ jokerCard, jokerCategory, style }: GetConfigParam): JokerConfig => {
  const CHAOS_THE_CLOWN_METADATA: JokerMetadata = {
    price: 4,
    name: 'Chaos The Clown',
    description: '1 free Reroll per shop',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class ChaosTheClown extends jokerCard {
    constructor(game: Game) {
      super({
        game,
        ...CHAOS_THE_CLOWN_METADATA,
      });
    }
    
    async beforeShoppingHook() {
      this.game.round.value.freeRerollNumber.setValue((value) => value + 1);
      await this.emitEffect.emit();
    }
  }
  

  return {
    creator: (game) => new ChaosTheClown(game),
    metadata: CHAOS_THE_CLOWN_METADATA,
  }
}
