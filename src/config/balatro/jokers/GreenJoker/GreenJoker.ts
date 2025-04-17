import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";

export const getGreenJokerConfig = ({ jokerCard, jokerCategory, style, Value }: GetConfigParam): JokerConfig => {
  const GREEN_JOKER_METADATA: JokerMetadata = {
    price: 4,
    name: 'Green Joker',
    description: '+1 Mult per hand played, -1 Mult per discard(Currently +0 Mult)',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class GreenJoker extends jokerCard {
    multiFactor = new Value(0);

    constructor(game: Game) {
      super({
        game,
        ...GREEN_JOKER_METADATA,
      });

      this.multiFactor.value$.subscribe((_value) => {
          this.description.setValue(`+1 Mult per hand played, -1 Mult per discard(Currently +${_value} Mult)`);
      });
    }

    async beforeAllCardsEmitHook(): Promise<void> {
      this.multiFactor.setValue((_value) => _value + 1);
      await this.emitEffect.emit();
    }

    async afterAllCardsEmitHook(): Promise<void> {
      this.game.round.value.handMultiFactor.setValue((_value) => _value + this.multiFactor.value);
      await this.emitEffect.emit();
    }

    async afterDiscardHook(): Promise<void> {
      this.multiFactor.setValue((_value) => Math.max(0, _value - 1));
      await this.emitEffect.emit();
    }
  }

  return {
    creator: (game) => new GreenJoker(game),
    metadata: GREEN_JOKER_METADATA,
  }
}
