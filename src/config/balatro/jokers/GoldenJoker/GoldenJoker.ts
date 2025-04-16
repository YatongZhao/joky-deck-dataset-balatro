import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";

export const getGoldenJokerConfig = ({ jokerCard, jokerCategory, style }: GetConfigParam): JokerConfig => {
  const GOLDEN_JOKER_METADATA: JokerMetadata = {
    price: 6,
    name: 'Golden Joker',
    description: 'Earn $4 at end of round',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class GoldenJoker extends jokerCard {
    constructor(game: Game) {
      super({
        game,
        ...GOLDEN_JOKER_METADATA,
      });
    }

    async afterRoundEndHook(): Promise<void> {
      this.game.money.setValue(money => money + 4);
      await this.emitEffect.emit();
    }
  }

  return {
    creator: (game) => new GoldenJoker(game),
    metadata: GOLDEN_JOKER_METADATA,
  }
}
