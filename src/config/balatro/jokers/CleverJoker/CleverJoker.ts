import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";

export const getCleverJokerConfig = ({
  jokerCard,
  jokerCategory,
  style,
  valueType,
}: GetConfigParam): JokerConfig => {
  const CLEVER_JOKER_METADATA: JokerMetadata = {
    price: 4,
    name: "Clever Joker",
    description: "+150 Chips if played hand contains a Four of a Kind",
    image: style === "flat" ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  };

  class CleverJoker extends jokerCard {
    constructor(game: Game) {
      super({
        game,
        ...CLEVER_JOKER_METADATA,
      });
    }

    async afterAllCardsEmitHook() {
      const handValue = this.game.round.value.selectedHandValue.value;
      if (handValue && handValue.type === valueType.fourOfAKind) {
        this.game.round.value.handChipsFactor.setValue(
          (factor) => factor + 150
        );
        await this.emitEffect.emit();
      }
    }
  }

  return {
    creator: (game) => new CleverJoker(game),
    metadata: CLEVER_JOKER_METADATA,
  };
};
