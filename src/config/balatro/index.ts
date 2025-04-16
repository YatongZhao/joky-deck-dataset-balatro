import { GetConfigParam } from '@yatongzhao/joky-deck-core'
import { getAbstractJokerConfig } from './jokers/AbstractJoker/AbstractJoker'
import { getBannerConfig } from './jokers/Banner.ts/Banner'
import { getBlueJokerConfig } from './jokers/BlueJoker/BlueJoker'
import { getBusinessCardConfig } from './jokers/BusinessCard/BusinessCard'
import { getCavendishConfig } from './jokers/Cavendish/Cavendish'
import { getChaosTheClownConfig } from './jokers/ChaosTheClown.ts/ChaosTheClown'
import { getCleverJokerConfig } from './jokers/CleverJoker/CleverJoker'
import { getCraftyJokerConfig } from './jokers/CraftyJoker/CraftyJoker'
import { getCrazyJokerConfig } from './jokers/CrazyJoker/CrazyJoker'
import { getCreditCardConfig } from './jokers/CreditCard/CreditCard'
import { getDelayedGratificationConfig } from './jokers/DelayedGratification/DelayedGratification'
import { getDeviousJokerConfig } from './jokers/DeviousJoker/DeviousJoker'
import { getDrollJokerConfig } from './jokers/DrollJoker/DrollJoker'
import { getDrunkardConfig } from './jokers/Drunkard/Drunkard'

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
      getCraftyJokerConfig(params),
      getCrazyJokerConfig(params),
      getCreditCardConfig(params),
      getDelayedGratificationConfig(params),
      getDeviousJokerConfig(params),
      getDrollJokerConfig(params),
      getDrunkardConfig(params),
    ],
  }
}
