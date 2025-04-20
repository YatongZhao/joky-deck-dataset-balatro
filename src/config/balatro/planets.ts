import type { GetConfigParam, PlanetConfig } from "@yatongzhao/joky-deck-core";

export const getPlanetConfigs = (params: GetConfigParam): PlanetConfig[] => {
  return [
    {
      metadata: {
        name: 'Pluto',
        description: 'High Card',
        valueType: params.valueType.highCard,
      },
    },
    {
      metadata: {
        name: 'Mercury',
        description: 'Pair',
        valueType: params.valueType.pair,
      },
    },
    {
      metadata: {
        name: 'Uranus',
        description: 'Two Pairs',
        valueType: params.valueType.twoPairs,
      },
    },
    {
      metadata: {
        name: 'Venus',
        description: 'Three of a Kind',
        valueType: params.valueType.threeOfAKind,
      },
    },
    {
      metadata: {
        name: 'Saturn',
        description: 'Straight',
        valueType: params.valueType.straight,
      },
    },
    {
      metadata: {
        name: 'Jupiter',
        description: 'Flush',
        valueType: params.valueType.flush,
      },
    },
    {
      metadata: {
        name: 'Earth',
        description: 'Full House',
        valueType: params.valueType.fullHouse,
      },
    },
    {
      metadata: {
        name: 'Mars',
        description: 'Four of a Kind',
        valueType: params.valueType.fourOfAKind,
      },
    },
    {
      metadata: {
        name: 'Neptune',
        description: 'Straight Flush',
        valueType: params.valueType.straightFlush,
      },
    },
  ]
}
