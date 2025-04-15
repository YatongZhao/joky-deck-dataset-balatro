import type { Game, JokerConfig, JokerMetadata, GetConfigParam } from "@yatongzhao/joky-deck-core";
import flatJokerImage from './flat.png'
import jokerJokerImage from './joker.png'

export const getBannerConfig = ({ jokerCard, jokerCategory, style }: GetConfigParam): JokerConfig => {
  const BANNER_METADATA: JokerMetadata = {
    price: 5,
    name: 'Banner',
    description: '+40 Chips for each remaining discard',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class Banner extends jokerCard {
    constructor(game: Game) {
      super({
        game,
        ...BANNER_METADATA,
      });
    }

    async afterAllCardsEmitHook() {
      this.game.round.value.handChipsFactor.setValue(factor => factor + 40 * this.game.round.value.discards.value);
      await this.emitEffect.emit();
    }
  }

  return {
    creator: (game) => new Banner(game),
    metadata: BANNER_METADATA,
  }
}
