import type { Game, JokerMetadata, JokerConfig } from "@yatongzhao/joky-deck-core";
import type { GetConfigParam } from '../../../type'
import flatJokerImage from './flat.png'
import jokerJokerImage from './joker.png'

export const getAbstractJokerConfig = ({ jokerCard, jokerCategory, style }: GetConfigParam): JokerConfig => {
  const ABSTRACT_JOKER_METADATA: JokerMetadata = {
    price: 4,
    name: '抽象小丑',
    description: '每张小丑牌+3倍率',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class AbstractJoker extends jokerCard {
    constructor(game: Game) {
      super({
        game: game,
        ...ABSTRACT_JOKER_METADATA,
      });
    }

    async afterAllCardsEmitHook() {
      const jokerCount = this.game.handJokerCards.value.length;
      this.game.round.value.handMultiFactor.setValue(factor => factor + jokerCount * 3);
      await this.emitEffect.emit();
    }
  }
  return {
    creator: (game) => new AbstractJoker(game),
    metadata: ABSTRACT_JOKER_METADATA,
  }
}
