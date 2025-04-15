import { GetConfigParam } from '@yatongzhao/joky-deck-core'
import { getAbstractJokerConfig } from './jokers/AbstractJoker/AbstractJoker'
import { getBannerConfig } from './jokers/Banner.ts/Banner'
import { getBlueJokerConfig } from './jokers/BlueJoker/BlueJoker'
import { getBusinessCardConfig } from './jokers/BusinessCard/BusinessCard'
import { getCavendishConfig } from './jokers/Cavendish/Cavendish'
import { getChaosTheClownConfig } from './jokers/ChaosTheClown.ts/ChaosTheClown'
import { getCleverJokerConfig } from './jokers/CleverJoker/CleverJoker'

export const getBalatroConfig = (params: GetConfigParam) => {
  return {
    jokers: [
      getAbstractJokerConfig(params),
      getBannerConfig(params),
      getBlueJokerConfig(params),
      getBusinessCardConfig(params),
      getCavendishConfig(params),
      getChaosTheClownConfig(params),
      getCleverJokerConfig(params),
    ],
  }
}
