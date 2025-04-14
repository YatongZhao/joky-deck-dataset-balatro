import { Game, JokerCard, JokerMetadata, JokerCategory, JokerConfig } from "@yatongzhao/joky-deck-core";
import jokerImage from './joker.png'

export const ABSTRACT_JOKER_METADATA: JokerMetadata = {
  price: 4,
  name: '抽象小丑',
  description: '每张小丑牌+3倍率',
  image: jokerImage,
  category: JokerCategory.common,
}

export class AbstractJoker extends JokerCard {
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

export const abstractJokerConfig: JokerConfig = {
  creator: (game) => new AbstractJoker(game),
  metadata: ABSTRACT_JOKER_METADATA,
}
