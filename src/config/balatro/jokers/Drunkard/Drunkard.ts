import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";

export const getDrunkardConfig = ({ jokerCard, jokerCategory, style }: GetConfigParam): JokerConfig => {
  const DRUNKARD_METADATA: JokerMetadata = {
    price: 4,
    name: 'Drunkard',
    description: '+1 discard each round',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class Drunkard extends jokerCard {
    constructor(game: Game) {
      super({
        game: game,
        ...DRUNKARD_METADATA,
      });
    }

    async beforeRoundStartHook() {
      this.game.round.value.discards.setValue(discards => discards + 1);
      await this.emitEffect.emit();
    }
  }
  return {
    creator: (game) => new Drunkard(game),
    metadata: DRUNKARD_METADATA,
  }
}
