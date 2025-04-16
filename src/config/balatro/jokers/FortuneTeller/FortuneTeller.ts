import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";

export const getFortuneTellerConfig = ({ jokerCard, jokerCategory, style }: GetConfigParam): JokerConfig => {
  const FORTUNE_TELLER_METADATA: JokerMetadata = {
    price: 6,
    name: 'Fortune Teller',
    description: `+1 Mult per Tarot card used this run (Currently +0)`,
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class FortuneTeller extends jokerCard {
    constructor(game: Game) {
      super({
        game,
        ...FORTUNE_TELLER_METADATA,
      });
      
      this.game.tarotCardUsedNumber.value$.subscribe(number => {
        this.description.setValue(`+1 Mult per Tarot card used this run (Currently +${number})`);
      });
    }

    async afterAllCardsEmitHook(): Promise<void> {
      this.game.round.value.handMultiFactor.setValue(multi => multi + this.game.tarotCardUsedNumber.value);
      await this.emitEffect.emit();
    }
  }

  return {
    creator: (game) => new FortuneTeller(game),
    metadata: FORTUNE_TELLER_METADATA,
  }
}
