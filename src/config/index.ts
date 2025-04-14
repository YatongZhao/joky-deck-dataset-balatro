import type { Config } from '@yatongzhao/joky-deck-core'
import joker from './joker.png'

function main() {
  console.log(joker)
  console.log('Hello, world!!!!')
}

function hello() {
  console.log('Hello, world!')
}

main()
hello()

const config: Config = {
  jokers: [
    {
      name: 'Joker',
      description: 'Joker',
      image: joker,
      value: 14,
      suit: 'joker',
    },
  ],
}

export {
  main,
  hello,
  config,
}
