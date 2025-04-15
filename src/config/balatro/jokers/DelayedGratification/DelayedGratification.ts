import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";

export const getDelayedGratificationConfig = ({ jokerCard, jokerCategory, style }: GetConfigParam): JokerConfig => {
  const DELAYED_GRATIFICATION_METADATA: JokerMetadata = {
    price: 4,
    name: 'Delayed Gratification',
    description: 'Earn $2 per discard if no discards are used by end of the round',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class DelayedGratification extends jokerCard {
  isDiscardUsedInThisRound = false;

    constructor(game: Game) {
      super({
        game: game,
        ...DELAYED_GRATIFICATION_METADATA,
      });
    }

    async afterDiscardHook() {
      this.isDiscardUsedInThisRound = true;
    }
  
    async afterRoundEndHook() {
      if (!this.isDiscardUsedInThisRound) {
        this.game.money.setValue(money => money + this.game.round.value.discards.value * 2);
        await this.emitEffect.emit();
      }
      this.isDiscardUsedInThisRound = false;
    }
  }
  return {
    creator: (game) => new DelayedGratification(game),
    metadata: DELAYED_GRATIFICATION_METADATA,
  }
}
