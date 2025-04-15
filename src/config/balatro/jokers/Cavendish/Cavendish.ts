import type { Game, JokerMetadata, JokerConfig, GetConfigParam } from "@yatongzhao/joky-deck-core";
import flatJokerImage from './flat.png'
import jokerJokerImage from './joker.png'
import { randomByChance } from "../../../../utils/random";

export const getCavendishConfig = ({ jokerCard, jokerCategory, style }: GetConfigParam): JokerConfig => {
  const CAVENDISH_METADATA: JokerMetadata = {
    price: 4,
    name: 'Cavendish',
    description: 'X3 Mult, 1 in 1000 chance this card is destroyed at the end of round',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class Cavendish extends jokerCard {
    constructor(game: Game) {
      super({
        game,
        ...CAVENDISH_METADATA,
      });
    }
  
    async afterAllCardsEmitHook(): Promise<void> {
      this.game.round.value.handMultiFactor.setValue(multiFactor => multiFactor * 3);
      await this.emitEffect.emit();
    }
  
    async afterRoundEndHook() {
      if (randomByChance(0.001)) {
        await this.emitEffect.emit();
        this.game.handJokerCards.setValue(cards => cards.filter(card => card.id !== this.id));
      }
    }
  }

  return {
    creator: (game) => new Cavendish(game),
    metadata: CAVENDISH_METADATA,
  }
}
