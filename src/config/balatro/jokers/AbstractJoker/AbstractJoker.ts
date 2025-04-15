import type { Game, JokerMetadata, JokerConfig, GetConfigParam } from "@yatongzhao/joky-deck-core";
import flatJokerImage from './flat.png'
import jokerJokerImage from './joker.png'

export const getAbstractJokerConfig = ({ jokerCard, jokerCategory, style }: GetConfigParam): JokerConfig => {
  const ABSTRACT_JOKER_METADATA: JokerMetadata = {
    price: 4,
    name: 'Abstract Joker',
    description: '+3 Mult for each Joker card (Currently +0 Mult)',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class AbstractJoker extends jokerCard {
    private jokerCount = 0;
    constructor(game: Game) {
      super({
        game: game,
        ...ABSTRACT_JOKER_METADATA,
      });

      this.game.handJokerCards.value$.subscribe(jokerCards => {
        this.jokerCount = jokerCards.length;
        this.description.setValue(`+3 Mult for each Joker card (Currently +${this.jokerCount * 3} Mult)`);
      });
    }

    async afterAllCardsEmitHook() {
      this.game.round.value.handMultiFactor.setValue(factor => factor + this.jokerCount * 3);
      await this.emitEffect.emit();
    }
  }
  return {
    creator: (game) => new AbstractJoker(game),
    metadata: ABSTRACT_JOKER_METADATA,
  }
}
