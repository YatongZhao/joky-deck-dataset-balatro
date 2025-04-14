import { getAbstractJokerConfig } from './jokers/AbstractJoker/AbstractJoker'
import { getBannerConfig } from './jokers/Banner.ts/Banner'
import type { GetConfigParam } from '../type'

export const getBalatroConfig = (params: GetConfigParam) => {
  return {
    jokers: [
      getAbstractJokerConfig(params),
      getBannerConfig(params),
    ],
  }
}
