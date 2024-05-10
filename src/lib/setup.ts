import {Setup} from './types'

export const setup: Setup = {
  ball: {
    x: 50,
    y: 50,
    color: 'blue',
    radius: 20,
  },

  bar: {
    x: 50,
    y: 50,
    color: 'blue',
    colorActive: 'red',
    width: 40,
    height: 20,
  },

  sounds: [
    {'id': '1', 'name': 'Sound1'},
    {'id': '2', 'name': 'Sound2'},
  ],

  app: {
    canvas: {
      width: 600,
      height: 400
    },
    bpm: 120
  }
};


export default setup;