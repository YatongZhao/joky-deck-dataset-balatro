import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
  Card,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";
import { randomByChance } from "../../../../utils/random";

export const getEightBallConfig = ({ jokerCard, jokerCategory, style, cardLabels }: GetConfigParam): JokerConfig => {
  const EIGHT_BALL_METADATA: JokerMetadata = {
    price: 5,
    name: 'Eight Ball',
    description: 'Each time an 8 is played, there is a 25% chance to draw a Tarot card (must have space)',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class EightBall extends jokerCard {
    constructor(game: Game) {
      super({
        game: game,
        ...EIGHT_BALL_METADATA,
      });
    }

    async afterCardHook(param: { card: Card }) {
      if (param.card.label.value.label === cardLabels.n8) {
        if (!randomByChance(0.25)) return;
        if (!this.game.tryAddConsumableCardToHand(this.game.getRandomTarotCard())) return;
        await this.emitEffect.emit();
      }
    }
  }
  return {
    creator: (game) => new EightBall(game),
    metadata: EIGHT_BALL_METADATA,
  }
}
