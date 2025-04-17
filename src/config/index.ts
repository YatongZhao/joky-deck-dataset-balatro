import { getBalatroConfig } from './balatro'
import type { GetConfigParam } from '@yatongzhao/joky-deck-core'
const getConfig = (param: GetConfigParam) => {
  return {
    balatro: getBalatroConfig(param),
  }
}

export {
  getConfig,
}
