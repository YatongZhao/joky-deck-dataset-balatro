import type {
  Game,
  JokerMetadata,
  JokerConfig,
  GetConfigParam,
  Card,
} from "@yatongzhao/joky-deck-core";
import flatJokerImage from "./flat.png";
import jokerJokerImage from "./joker.png";


export const getGoldenTicketConfig = ({ jokerCard, jokerCategory, style, enhancements }: GetConfigParam): JokerConfig => {
  const GOLDEN_TICKET_METADATA: JokerMetadata = {
    price: 5,
    name: 'Golden Ticket',
    description: 'Played Gold cards earn $4 when scored',
    image: style === 'flat' ? flatJokerImage : jokerJokerImage,
    category: jokerCategory.common,
  }

  class GoldenTicket extends jokerCard {
    constructor(game: Game) {
      super({
        game: game,
        ...GOLDEN_TICKET_METADATA,
      });
    }
  
    async afterCardHook(param: { card: Card; }): Promise<void> {
      if (param.card.enhancement.value === enhancements.Gold) {
        this.game.money.setValue(money => money + 4);
        await this.emitEffect.emit();
      }
    }
  }
  return {
    creator: (game) => new GoldenTicket(game),
    metadata: GOLDEN_TICKET_METADATA,
  }
}
