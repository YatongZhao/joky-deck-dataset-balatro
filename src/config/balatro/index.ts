import { getAbstractJokerConfig } from './jokers/AbstractJoker/AbstractJoker'
import type { GetConfigParam } from '../type'

export const getBalatroConfig = (params: GetConfigParam) => {
  return {
    jokers: [
      getAbstractJokerConfig(params),
    ],
  }
}
