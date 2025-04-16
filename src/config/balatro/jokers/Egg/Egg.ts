import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";

export const getEggConfig = ({ jokerCard, jokerCategory, style }: GetConfigParam): JokerConfig => {
  const EGG_METADATA: JokerMetadata = {
    price: 4,
    name: 'Egg',
    description: 'Gains $3 of sell value at end of round (Current sell value: $2)',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class Egg extends jokerCard {
    constructor(game: Game) {
      super({
        game: game,
        ...EGG_METADATA,
      });
      this.sellPrice.value$.subscribe((value) => {
        this.description.setValue(`Gains $3 of sell value at end of round (Current sell value: ${value}$)`);
      });
    }

    async afterRoundEndHook() {
      this.sellPrice.setValue((value) => value + 3);
    }
  }
  return {
    creator: (game) => new Egg(game),
    metadata: EGG_METADATA,
  }
}
