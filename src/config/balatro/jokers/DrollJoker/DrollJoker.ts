import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";

export const getDrollJokerConfig = ({ jokerCard, jokerCategory, style, valueType }: GetConfigParam): JokerConfig => {
  const DROLL_JOKER_METADATA: JokerMetadata = {
    price: 4,
    name: 'Droll Joker',
    description: '+12 Mult if played hand contains a Straight',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class DrollJoker extends jokerCard {
    constructor(game: Game) {
      super({
        game: game,
        ...DROLL_JOKER_METADATA,
      });
    }

    async afterAllCardsEmitHook(): Promise<void> {
      const handValue = this.game.round.value.selectedHandValue.value;
      if (handValue && (
        handValue.type === valueType.flush ||
        handValue.type === valueType.straightFlush
      )) {
        this.game.round.value.handMultiFactor.setValue(factor => factor + 10);
        await this.emitEffect.emit();
      }
    }
  }
  return {
    creator: (game) => new DrollJoker(game),
    metadata: DROLL_JOKER_METADATA,
  }
}
